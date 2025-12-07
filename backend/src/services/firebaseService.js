import admin from "../config/firebase.js";

export const createFirebaseUser = async (email, password) => {
  return await admin.auth().createUser({
    email,
    password
  });
};

export const sendEmailVerificationLink = async (email) => {
  const link = await admin.auth().generateEmailVerificationLink(email);
  return link; // frontend will redirect user to this link
};

export const verifyIdToken = async (idToken) => {
  return await admin.auth().verifyIdToken(idToken);
};
