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
    }
];

function TriggerAlertFromValidationScript() {
    
}

function ShowValidationDetails(validationId) {
    let currentValidationDoc = validation_docs.filter(v => v.validationId == validationId)[0];
    let validationReferenceContent =
        `<table style="margin-top: 10px;margin-bottom: 10px;">
                <tbody>
                    <tr>
                        <td style="padding: 10px;">${currentValidationDoc.summary} <br></td>
                    </tr>
                    <tr style="">
                        <td style="padding: 10px;"><a href="${currentValidationDoc.link}" target="_blank">${currentValidationDoc.levelName} -  ${currentValidationDoc.guidelineId}</a></td>
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

