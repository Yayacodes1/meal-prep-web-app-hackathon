import firebase_admin
from firebase_admin import credentials, firestore, auth, storage, messaging

# Path to your service account key JSON file
cred = credentials.Certificate("serviceAccountKey.json")

# Initialize Firebase App (only once)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'meal-prep-web-app-8de5f.appspot.com',
    })

# Firestore DB client
db = firestore.client()

# Firebase Auth is used like: auth.get_user(uid)
# Firebase Storage is used like: bucket.blob("filename")
bucket = storage.bucket()

# Firebase Messaging (optional)
def send_push_notification(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(title=title, body=body),
        token=token
    )
    response = messaging.send(message)
    return response
