function calculateScore() {
    let totalPoints = 0;
    let answeredQuestions = 0;

    const mfaAnswer = document.querySelector('input[name="mfa1"]:checked');
    const emailAnswer = document.querySelector('input[name="email1"]:checked');

    if (mfaAnswer) {
        totalPoints += Number(mfaAnswer.value);
        answeredQuestions++;
    }

    if (emailAnswer) {
        totalPoints += Number(emailAnswer.value);
        answeredQuestions++;
    }

    if (answeredQuestions < 2) {
        document.getElementById("results").innerHTML =
            "<p>Please answer all questions before viewing your results.</p>";
        return;
    }

    const maxPoints = 6;
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    let riskLevel = "";

    if (percentage >= 80) {
        riskLevel = "Low Risk / Strong Security";
    } else if (percentage >= 60) {
        riskLevel = "Moderate Risk";
    } else if (percentage >= 40) {
        riskLevel = "High Risk";
    } else {
        riskLevel = "Critical Risk";
    }

    let feedback = "";

    if (mfaAnswer.value === "0" || mfaAnswer.value === "1") {
        feedback += `
            <h3>MFA Recommendation</h3>
            <p><strong>Why it matters:</strong> MFA adds another layer of protection if an employee's password is stolen.</p>
            <p><strong>Recommended action:</strong> Enable MFA for company email accounts and administrator accounts.</p>
        `;
    }

    if (emailAnswer.value === "0" || emailAnswer.value === "1") {
        feedback += `
            <h3>Email Security Recommendation</h3>
            <p><strong>Why it matters:</strong> Phishing emails can be used to steal passwords or deliver malware.</p>
            <p><strong>Recommended action:</strong> Use spam and phishing filtering and make sure employees know how to report suspicious emails.</p>
        `;
    }

    document.getElementById("results").innerHTML = `
        <h2>Your Results</h2>
        <p><strong>Cybersecurity Score:</strong> ${percentage}%</p>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
        ${feedback}
    `;
}
