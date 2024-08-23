dayjs.extend(dayjs_plugin_customParseFormat);
function calculateMilestone() {
    const birthDateText = document.getElementById("birthDateText").value;
    const birthDateCalendar = document.getElementById("birthDateCalendar").value;
    const gestationalWeeks = parseInt(document.getElementById("gestationalWeeks").value);
    const gestationalDays = parseInt(document.getElementById("gestationalDays").value);
    clearErrors();
    const birthDate = validateAndParseBirthDate(birthDateText, birthDateCalendar);
    if (!birthDate) return;
    if (!validateGestationalAge(gestationalWeeks, gestationalDays)) return;
    const totalGestationalDays = gestationalWeeks * 7 + gestationalDays;
    const milestoneDate = birthDate.add(totalGestationalDays, "day");
    const formattedBirthDate = formatDate(birthDate);
    const formattedMilestoneDate = formatDate(milestoneDate);
    const resultText = `A baby born on ${formattedBirthDate} at ${gestationalWeeks} weeks and ${gestationalDays} days gestation ` + `will have been alive for as long as they were in the womb on ${formattedMilestoneDate}.`;
    document.getElementById("result").textContent = resultText;
}
function validateAndParseBirthDate(textInput, calendarInput) {
    let birthDate;
    if (textInput) birthDate = dayjs(textInput, "MM/DD/YYYY", true);
    else if (calendarInput) birthDate = dayjs(calendarInput);
    if (!birthDate || !birthDate.isValid() || birthDate.isAfter(dayjs()) || birthDate.isBefore(dayjs().subtract(150, "year"))) {
        document.getElementById("birthDateError").textContent = "Please enter a valid birth date.";
        return null;
    }
    return birthDate;
}
function validateGestationalAge(weeks, days) {
    if (isNaN(weeks) || isNaN(days) || weeks < 20 || weeks > 42 || days < 0 || days > 6) {
        document.getElementById("gestationalAgeError").textContent = "Please enter a valid gestational age (20-42 weeks, 0-6 days).";
        return false;
    }
    return true;
}
function formatDate(date) {
    return date.format("MMMM D, YYYY");
}
function clearErrors() {
    document.getElementById("birthDateError").textContent = "";
    document.getElementById("gestationalAgeError").textContent = "";
    document.getElementById("result").textContent = "";
}

//# sourceMappingURL=index.07fb0500.js.map
