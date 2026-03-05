from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="TrueHome Group API")

# CORS setup for Frontend communication
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
    "http://localhost:4173", # Vite preview
    "https://truehomegroup.vercel.app" # Production placeholder
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookingRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    appliance_type: str
    other_appliance: Optional[str] = None
    preferred_date: str
    notes: Optional[str] = ""

def send_booking_email(booking: BookingRequest):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL", "appliances@truehomegroup.com")

    if not smtp_username or not smtp_password:
        print("Warning: SMTP credentials not fully configured.")
        # We don't throw an error here during development, just print a warning.
        # In production this should probably throw an error.
        return True

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"New Installation Request: {booking.appliance_type} - {booking.name}"
    msg["From"] = smtp_username
    msg["To"] = receiver_email

    appliance_display = booking.appliance_type
    if booking.appliance_type == "Other" and booking.other_appliance:
        appliance_display = f"Other ({booking.other_appliance})"

    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #1C1C1E; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1B2D45; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Installation Booking</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">TrueHome Group Web Portal</p>
        </div>
        <div style="padding: 20px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
            <p>A new installation request has been submitted.</p>
            
            <h3 style="border-bottom: 2px solid #E07B39; padding-bottom: 5px; color: #1B2D45;">Customer Details</h3>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> {booking.name}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:{booking.email}">{booking.email}</a></li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> {booking.phone or 'Not provided'}</li>
            </ul>

            <h3 style="border-bottom: 2px solid #E07B39; padding-bottom: 5px; color: #1B2D45;">Installation Details</h3>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Appliance:</strong> {appliance_display}</li>
                <li style="margin-bottom: 10px;"><strong>Preferred Date:</strong> {booking.preferred_date}</li>
            </ul>

            <h3 style="border-bottom: 2px solid #E07B39; padding-bottom: 5px; color: #1B2D45;">Notes</h3>
            <p style="background-color: #F8F6F2; padding: 15px; border-radius: 4px; font-style: italic;">
                {booking.notes or 'No special instructions provided.'}
            </p>
        </div>
      </body>
    </html>
    """

    part = MIMEText(html_content, "html")
    msg.attach(part)

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, receiver_email, msg.as_string())
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise e

@app.post("/api/book")
async def create_booking(booking: BookingRequest):
    try:
        # Send email
        send_booking_email(booking)
        return {"success": True, "message": "Booking received successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to process booking.")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "TrueHome Group API"}
