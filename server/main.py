from application import app
import os

if __name__ == "__main__":
  # host='0.0.0.0', debug=False, port=int(os.environ.get("PORT", 5000))
  app.run(port=(os.getenv('PORT') if os.getenv('PORT') else 5000), debug=False)
