const businessEmail = "boodrotechrepair@gmail.com";

const emailLink = document.getElementById("email-link");
const businessEmailLabel = document.getElementById("business-email");
const contactForm = document.getElementById("contact-form");
const deviceCategory = document.getElementById("device-category");
const deviceModel = document.getElementById("device-model");
const otherDeviceWrap = document.getElementById("other-device-wrap");
const otherDeviceInput = document.getElementById("other-device");

const deviceOptions = {
  PlayStation: [
    "PlayStation 1",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 4 Pro",
    "PlayStation 5",
    "PlayStation Portal",
    "PSP",
    "PS Vita"
  ],
  Xbox: [
    "Original Xbox",
    "Xbox 360",
    "Xbox One",
    "Xbox One S",
    "Xbox One X",
    "Xbox Series S",
    "Xbox Series X"
  ],
  Nintendo: [
    "NES",
    "SNES",
    "Nintendo 64",
    "GameCube",
    "Wii",
    "Wii U",
    "Nintendo Switch",
    "Switch Lite",
    "Switch OLED",
    "Nintendo DS",
    "Nintendo 3DS"
  ],
  Phone: [
    "iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "Motorola",
    "Other Phone"
  ],
  Tablet: [
    "iPad",
    "Samsung Galaxy Tab",
    "Amazon Fire",
    "Microsoft Surface",
    "Other Tablet"
  ],
  Computer: [
    "Windows Laptop",
    "Windows Desktop",
    "MacBook",
    "iMac",
    "Custom PC",
    "Other Computer"
  ],
  Other: [
    "Other Device"
  ]
};

function populateModels(category) {
  const options = deviceOptions[category] || [];

  deviceModel.innerHTML = '<option value="">Choose a model</option>';
  deviceModel.disabled = options.length === 0;

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    deviceModel.appendChild(optionElement);
  });

  toggleOtherDeviceField(category, "");
}

function toggleOtherDeviceField(category, model) {
  const showCustomField = category === "Other" || String(model).startsWith("Other");
  otherDeviceWrap.classList.toggle("hidden", !showCustomField);
  otherDeviceInput.required = showCustomField;

  if (!showCustomField) {
    otherDeviceInput.value = "";
  }
}

emailLink.href = `mailto:${businessEmail}`;
emailLink.textContent = businessEmail;
businessEmailLabel.textContent = businessEmail;
businessEmailLabel.href = `mailto:${businessEmail}`;

deviceCategory.addEventListener("change", () => {
  populateModels(deviceCategory.value);
});

deviceModel.addEventListener("change", () => {
  toggleOtherDeviceField(deviceCategory.value, deviceModel.value);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const senderEmail = formData.get("senderEmail");
  const category = formData.get("deviceCategory");
  const model = formData.get("deviceModel");
  const otherDevice = formData.get("otherDevice");
  const message = formData.get("message");
  const useCustomName = category === "Other" || String(model).startsWith("Other");
  const specificDevice = useCustomName ? otherDevice : model;
  const selectedDevice = `${category} - ${specificDevice}`;

  const subject = encodeURIComponent(`Repair Request: ${selectedDevice}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Customer Email: ${senderEmail}\n` +
    `Device Category: ${category}\n` +
    `Specific Model: ${specificDevice}\n\n` +
    `Issue:\n${message}`
  );

  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
});
