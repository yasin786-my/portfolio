from flask import Flask, request, jsonify
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)


@app.route("/api/send_email", methods=["POST"])
def send_email():
    """Handle contact form submissions and send email via Gmail SMTP."""

    # ── CORS preflight is handled by Vercel headers in vercel.json ──

    try:
        data = request.get_json()

        # Validate required fields
        if not data:
            return jsonify({"error": "No data provided"}), 400

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not name or not email or not message:
            return jsonify({"error": "All fields are required"}), 400

        # Basic email validation
        if "@" not in email or "." not in email:
            return jsonify({"error": "Invalid email address"}), 400

        # ── Get credentials from Vercel environment variables ──
        gmail_user = os.environ.get("GMAIL_USER")
        gmail_app_password = os.environ.get("GMAIL_APP_PASSWORD")
        recipient_email = os.environ.get("RECIPIENT_EMAIL", gmail_user)

        if not gmail_user or not gmail_app_password:
            return jsonify({"error": "Email service not configured"}), 500

        # ── Build the email ──
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: {name}"
        msg["From"] = gmail_user
        msg["To"] = recipient_email
        msg["Reply-To"] = email

        # Plain text version
        text_body = f"""
New message from your portfolio contact form:

Name: {name}
Email: {email}

Message:
{message}

---
Sent from your Portfolio Website
        """.strip()

        # HTML version (styled email)
        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 0; margin: 0; }}
    .container {{ max-width: 600px; margin: 0 auto; padding: 32px; }}
    .header {{ background: linear-gradient(135deg, #FFD93D, #f0c800); padding: 24px 32px; border-radius: 16px 16px 0 0; text-align: center; }}
    .header h1 {{ color: #0a0a0a; margin: 0; font-size: 22px; font-weight: 800; }}
    .body {{ background: #1a1a1a; padding: 32px; border: 1px solid #333; border-top: none; border-radius: 0 0 16px 16px; }}
    .field {{ margin-bottom: 20px; }}
    .field-label {{ font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #FFD93D; font-weight: 700; margin-bottom: 6px; }}
    .field-value {{ font-size: 16px; color: #e0e0e0; line-height: 1.5; }}
    .message-box {{ background: #0a0a0a; border: 1px solid #333; border-radius: 12px; padding: 20px; margin-top: 8px; }}
    .footer {{ text-align: center; margin-top: 24px; font-size: 12px; color: #666; }}
    a {{ color: #FFD93D; text-decoration: none; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Portfolio Message</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">From</div>
        <div class="field-value">{name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:{email}">{email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">
          <div class="field-value">{message}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      Sent from your <strong>Portfolio Website</strong> contact form
    </div>
  </div>
</body>
</html>
        """.strip()

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        # ── Send via Gmail SMTP ──
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(gmail_user, gmail_app_password)
            server.sendmail(gmail_user, recipient_email, msg.as_string())

        return jsonify({
            "success": True,
            "message": "Email sent successfully!"
        }), 200

    except smtplib.SMTPAuthenticationError:
        return jsonify({
            "error": "Email authentication failed. Check your Gmail App Password."
        }), 500
    except smtplib.SMTPException as e:
        return jsonify({
            "error": f"Failed to send email: {str(e)}"
        }), 500
    except Exception as e:
        return jsonify({
            "error": f"Server error: {str(e)}"
        }), 500


# ── Health check endpoint ──
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "portfolio-backend"}), 200
