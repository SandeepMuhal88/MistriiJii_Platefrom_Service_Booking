export const logoutUser = async () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};