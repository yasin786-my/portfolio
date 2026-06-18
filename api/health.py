from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint to verify the API is running."""
    return jsonify({
        "status": "ok",
        "service": "portfolio-backend",
        "version": "1.0.0"
    }), 200
