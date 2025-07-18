export const handleNameInputChange = (e, setFormData) => {
  const { name, value } = e.target

  if (name === "name") {
    const capitalized = value
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ")

    setFormData((prev) => ({ ...prev, [name]: capitalized }))
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
}



export const validateStudent = (formData) => {
  const errs = {}

  if (!formData.name || formData.name.trim().length < 3) {
    errs.name = "Name must be at least 3 characters"
  }

  const ageNum = parseInt(formData.age)
  if (!ageNum || ageNum < 6) {
    errs.age = "Age must be a number greater than or equal to 6"
  }

  if (!formData.grade) {
    errs.grade = "Please select a grade"
  }

  if (!/^\d{10}$/.test(formData.contact)) {
    errs.contact = "Contact must be a valid 10-digit number"
  }

  return errs
}


export const validateStaff = (formData, isEditing = false) => {
  const errs = {};

  const letterCount = (formData.name.match(/[a-zA-Z]/g) || []).length;
  if (!formData.name || letterCount < 3) {
    errs.name = "Name must contain at least 3 letters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errs.email = "Please enter a valid email";
  }

  if (!isEditing && (!formData.password || formData.password.length < 6)) {
    errs.password = "Password must be at least 6 characters";
  }

  return errs;
};

