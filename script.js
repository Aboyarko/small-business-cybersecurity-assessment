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

    if (mfaAnswer.value === "0") {
        feedback += `
            <h3>MFA Recommendation</h3>
            <p><strong>Why it matters:</strong> MFA adds another layer of protection if an employee's password is stolen.</p>
            <p><strong>Recommended action:</strong> Enable MFA for company email accounts and administrator accounts.</p>
        `;
    } else if (mfaAnswer.value === "1") {
        feedback += `
            <h3>MFA Recommendation</h3>
            <p><strong>Why it matters:</strong> If you are not sure whether MFA is enabled, the company may have accounts that are not fully protected.</p>
            <p><strong>Recommended action:</strong> Check company email and administrator accounts to confirm that MFA is enabled.</p>
        `;
    } else if (mfaAnswer.value === "2") {
        feedback += `
            <h3>MFA Recommendation</h3>
            <p><strong>Why it matters:</strong> Partial MFA coverage can still leave some business accounts exposed.</p>
            <p><strong>Recommended action:</strong> Expand MFA to all important company accounts, especially email and administrator accounts.</p>
        `;
    }

    if (emailAnswer.value === "0") {
        feedback += `
            <h3>Email Security Recommendation</h3>
            <p><strong>Why it matters:</strong> Phishing emails can be used to steal passwords, spread malware, or trick employees into sending sensitive information.</p>
            <p><strong>Recommended action:</strong> Enable spam and phishing filtering and create a clear process for reporting suspicious emails.</p>
        `;
    } else if (emailAnswer.value === "1") {
        feedback += `
            <h3>Email Security Recommendation</h3>
            <p><strong>Why it matters:</strong> If you are not sure what email protections are in place, important security settings may not be configured.</p>
            <p><strong>Recommended action:</strong> Review your email security settings and confirm that spam and phishing protections are enabled.</p>
        `;
    } else if (emailAnswer.value === "2") {
        feedback += `
            <h3>Email Security Recommendation</h3>
            <p><strong>Why it matters:</strong> Partial email protection can still leave employees exposed to phishing and malicious messages.</p>
            <p><strong>Recommended action:</strong> Review current email filtering and strengthen areas that are not fully protected.</p>
        `;
    }

    if (feedback === "") {
        feedback = `
            <h3>Good Security Practices</h3>
            <p>Your current answers show that MFA and email security protections are in place.</p>
            <p>Continue reviewing these controls regularly and make sure they stay enabled for all employees.</p>
        `;
    }

    document.getElementById("results").innerHTML = `
        <h2>Your Results</h2>
        <p><strong>Cybersecurity Score:</strong> ${percentage}%</p>
        <p><strong>Risk Level:</strong> ${riskLevel}</p>
        ${feedback}
    `;
}
