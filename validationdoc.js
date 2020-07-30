// JavaScript source code
var validation_docs = [
    {
        validationId: 1,
        levelid: "1",
        levelName:"Level A",
        guidelineId: "3.1.1",
        guidlineName: "3.1.1 Language of Page (Level A)",
        title: "Document language missing",
        summary: "The language of the document is not identified.",
        link: "https://webaim.org/standards/wcag/checklist#sc3.1.1"
    },
    {
        validationId: 2,
        levelid: "1",
        levelName: "Level A",
        guidelineId: "1.1.1",
        guidlineName: "1.1.1 Non-text Content (Level A)",
        title: "Missing alternative text",
        summary: "Image alternative text is not present",
        link: "https://webaim.org/standards/wcag/checklist#sc1.1.1"
    },
    {
        validationId: 3,
        levelid: "1",
        levelName: "Level A",
        guidelineId: "1.3.1",
        guidlineName: "1.3.1 Info and Relationships (Level A)",
        title: "A form control does not have a corresponding label",
        summary: "If a text label for a form control is visible, use the &lt;label&gt; element to associate it with its respective form control. If there is no visible label, either provide an associated label, add a descriptive title attribute to the form control, or reference the label(s) using aria-labelledby. Labels are not required for image, submit, reset, button, or hidden form controls.",
        link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
    },
     {
        validationId: 4,
        levelid: "2",
        levelName: "Level AA",
        guidelineId: "1.3.1",
        guidlineName: "1.4.3 Contrast (Minimum) (Level AA)",
        title: "A form control does not have a corresponding label",
        summary: "Very low contrast between foreground and background colors.",
        link: "https://webaim.org/standards/wcag/checklist#sc1.3.1"
    }
];

function ShowValidationDetails(validationId) {
    let currentValidationDoc = validation_docs.filter(v => v.validationId == validationId)[0];
    let validationReferenceContent =
        `<table style="margin-top: 10px;margin-bottom: 10px;">
                <tbody>
                    <tr>
                        <td style="padding: 10px;">${currentValidationDoc.summary} <br></td>
                    </tr>
                    <tr style="">
                        <td style="padding: 10px;">
                            <label>Reference:</label><br />
                            <a href="${currentValidationDoc.link}" target="_blank">${currentValidationDoc.guidlineName}</a>
                            </td>
                    </tr>
                 </tbody>
              </table>`;
    window.sessionStorage["validationReferenceContent"] = validationReferenceContent;

}

window.addEventListener("message", function (event) {
    
    if (event.data.type == "show_validation_detail") {
        let validationId = event.data.validationId
        ShowValidationDetails(validationId);
    }
});

