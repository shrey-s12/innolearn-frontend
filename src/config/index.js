export const gender = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "other", label: "Other" },
];

export const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
];

export const signUpFormControls = [
  {
    name: "userFullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    componentType: "input",
  },
  {
    name: "userPhoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "text",
    componentType: "input",
  },
  {
    name: "userDateOfBirth",
    label: "Date of Birth",
    placeholder: "Enter your date of birth",
    type: "date",
    componentType: "input",
  },
  {
    name: "userGender",
    label: "Gender",
    placeholder: "Select your gender",
    type: "text",
    componentType: "select",
    options: gender,
  },
  {
    name: "userInterests",
    label: "Interests",
    placeholder: "Select your interests",
    componentType: "multi-select",
    options: courseCategories,
  },
  {
    name: "userAddress",
    label: "Address",
    componentType: "group",
    fields: [
      {
        name: "country",
        label: "Country",
        placeholder: "Enter your country",
        type: "text",
        componentType: "input",
      },
      {
        name: "state",
        label: "State",
        placeholder: "Enter your state",
        type: "text",
        componentType: "input",
      },
      {
        name: "city",
        label: "City",
        placeholder: "Enter your city",
        type: "text",
        componentType: "input",
      },
      {
        name: "street",
        label: "Street",
        placeholder: "Enter your street",
        type: "text",
        componentType: "input",
      },
    ],
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userFullName: "",
  userName: "",
  userEmail: "",
  password: "",
  confirmPassword: "",
  userPhoneNumber: "",
  userDateOfBirth: "",
  userGender: "",
  userInterests: [],
  userAddress: {
    country: "",
    state: "",
    city: "",
    street: "",
  },
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];

export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};

// Admin View
export const createInstructorFormControls = [
  {
    name: "instructorName",
    componentType: "input",
    placeholder: "Full Name",
    type: "text",
    label: "Full Name",
  },
  {
    name: "instructorEmail",
    componentType: "input",
    placeholder: "Email Address",
    type: "email",
    label: "Email Address",
  },
  {
    name: "instructorPhone",
    componentType: "input",
    placeholder: "Phone Number",
    type: "text",
    label: "Phone Number",
  },
  {
    name: "instructorAddress",
    componentType: "textarea",
    placeholder: "Address",
    label: "Address",
  },
  {
    name: "instructorQualification",
    componentType: "input",
    placeholder: "Qualification",
    type: "text",
    label: "Qualification",
  },
  {
    name: "instructorExperience",
    componentType: "textarea",
    placeholder: "Experience",
    label: "Experience",
  },
  {
    name: "instructorSpecialization",
    componentType: "multi-select",
    label: "Specialization",
    placeholder: "Select Specializations",
    options: courseCategories,
  },
  {
    name: "instructorUserName",
    componentType: "input",
    placeholder: "Username",
    type: "text",
    label: "Username",
  },
  {
    name: "instructorPassword",
    componentType: "input",
    placeholder: "Password",
    type: "password",
    label: "Password",
  },
  {
    name: "instructorLinkedinProfile",
    componentType: "input",
    placeholder: "LinkedIn Profile URL",
    type: "url",
    label: "LinkedIn Profile",
  },
  {
    name: "instructorBio",
    componentType: "textarea",
    placeholder: "Brief Bio",
    label: "Bio",
  },
];

export const initialCreateInstructorFormData = {
  instructorName: "",
  instructorEmail: "",
  instructorPhone: "",
  instructorAddress: "",
  instructorQualification: "",
  instructorExperience: "",
  instructorSpecialization: [],
  instructorUserName: "",
  instructorPassword: "",
  instructorLinkedinProfile: "",
  instructorBio: "",
  instructorProfilePicture: "",
};

export const instructorSingInFormControls = [
  {
    name: "instructorEmail",
    componentType: "input",
    placeholder: "Email Address",
    type: "email",
    label: "Email Address",
  },
  {
    name: "instructorPassword",
    componentType: "input",
    placeholder: "Password",
    type: "password",
    label: "Password",
  },
];

export const initialInstructorSignInFormData = {
  instructorEmail: "",
  instructorPassword: "",
};
