// import {
//   AlignmentType,
//   Document,
//   HeadingLevel,
//   Packer,
//   Paragraph,
//   TabStopPosition,
//   TabStopType,
//   TextRun
// } from "docx";

// // const PHONE_NUMBER = "07534563401";
// // const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
// // const EMAIL = "docx@docx.com";

// class DocumentCreator {
//   create([personalInfo, workExperiences, educations, projects]) {
//     const document = new Document({
//       sections: [
//         {
//           properties: {
//             // Set the top margin to 0
//             margin: {
//               top: 0,
//               right: 720,
//               bottom: 720,
//               left: 720,
//             },
//           },
//           children: [
//             new Paragraph({
//               text: "",
//               spacing: {
//                 before: 0, // No space before
//                 after: 0,  // No space after
//               },
//             }),
//             new Paragraph({
//               text: personalInfo.name,
//               heading: HeadingLevel.TITLE,
//               alignment: AlignmentType.CENTER, // Center the heading
//               spacing: {
//                 before: 0, // No space before
//                 after: 0,  // No space after
//               },
//             }),
//             this.createContactInfo(personalInfo.mobile, personalInfo.linkedin, personalInfo.email),

//             this.createHeading("Education"),
//             educations
//               .map(education => {
//                 const arr = [];
//                 arr.push(
//                   this.createInstitutionHeader(
//                     education.universityName,
//                     `${education.startDate} - ${education.endDate}`
//                   )
//                 );
//                 arr.push(
//                   this.createRoleText(
//                     `${education.relevantCourses} - ${education.degreeName}`
//                   )
//                 );
//                 return arr;
//               })
//               .reduce((prev, curr) => prev.concat(curr), []),

//             this.createHeading("Experience"),
//             workExperiences
//               .map(position => {
//                 const arr = [];
//                 arr.push(
//                   this.createInstitutionHeader(
//                     position.companyName,
//                     this.createPositionDateText(
//                       position.startDate,
//                       position.endDate,
//                     )
//                   )
//                 );
//                 arr.push(this.createRoleText(position.titlePositionHeld));

//                 const bulletPoints = this.splitParagraphIntoBullets(
//                   position.workDescription
//                 );
//                 bulletPoints.forEach(bulletPoint => {
//                   arr.push(this.createBullet(bulletPoint));
//                 });

//                 return arr;
//               })
//               .reduce((prev, curr) => prev.concat(curr), []),
//             // this.createHeading("Skills, projects and Interests"),
//             // this.createSubHeading("Skills"),
//             // this.createSkillList(otherInfo.skills),

//             this.createSubHeading("Projects"),
//             ...this.createProjectsList(projects),
//             this.createSubHeading("Interests"),
//             this.createInterests(
//               "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
//             ),
//           ]
//         }
//       ]
//     });

//     return document;
//   }

//   createContactInfo(phoneNumber, profileUrl, email) {
//     return new Paragraph({
//       alignment: AlignmentType.CENTER,
//       children: [
//         new TextRun(
//           `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
//         ),
//         new TextRun({
//           text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
//           break: 1
//         })
//       ]
//     });
//   }

//   createHeading(text) {
//     return new Paragraph({
//       text: text,
//       heading: HeadingLevel.HEADING_1,
//       thematicBreak: true
//     });
//   }

//   createSubHeading(text) {
//     return new Paragraph({
//       text: text,
//       heading: HeadingLevel.HEADING_2
//     });
//   }

//   createInstitutionHeader(institutionName, dateText) {
//     return new Paragraph({
//       tabStops: [
//         {
//           type: TabStopType.RIGHT,
//           position: TabStopPosition.MAX
//         }
//       ],
//       children: [
//         new TextRun({
//           text: institutionName,
//           bold: true
//         }),
//         new TextRun({
//           text: `\t${dateText}`,
//           bold: true
//         })
//       ]
//     });
//   }

//   createRoleText(roleText) {
//     return new Paragraph({
//       children: [
//         new TextRun({
//           text: roleText,
//           italics: true
//         })
//       ]
//     });
//   }

//   createBullet(text) {
//     return new Paragraph({
//       text: text,
//       bullet: {
//         level: 0
//       }
//     });
//   }

//   // createSkillList(skills) {
//   //   return new Paragraph({
//   //     children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
//   //   });
//   // }

//   createProjectsList(projects) {
//     if (!projects || projects.length === 0) {
//       return []; // Return an empty array if projects is null or empty.
//     }
//     return projects.map(
//       project =>
//         new Paragraph({
//           text: project.name,
//           bullet: {
//             level: 0
//           }
//         })
//     );
//   }

//   createInterests(interests) {
//     return new Paragraph({
//       children: [new TextRun(interests)]
//     });
//   }

//   splitParagraphIntoBullets(text) {
//     if (text === null) return [];
//     return text.split("\n\n");
//   }

//   createPositionDateText(startDate, endDate) {
//     return `${startDate} - ${endDate}`;
//   }

//   getMonthFromInt(value) {
//     switch (value) {
//       case 1:
//         return "Jan";
//       case 2:
//         return "Feb";
//       case 3:
//         return "Mar";
//       case 4:
//         return "Apr";
//       case 5:
//         return "May";
//       case 6:
//         return "Jun";
//       case 7:
//         return "Jul";
//       case 8:
//         return "Aug";
//       case 9:
//         return "Sept";
//       case 10:
//         return "Oct";
//       case 11:
//         return "Nov";
//       case 12:
//         return "Dec";
//       default:
//         return "N/A";
//     }
//   }
// }
// export default DocumentCreator
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from "docx";

// const PHONE_NUMBER = "07534563401";
// const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
// const EMAIL = "docx@docx.com";

class DocumentCreator {
  create([personalInfo, workExperiences, educations, projects]) {
    const document = new Document({
      sections: [
        {
          properties: {
            // Set the top margin to 0
            margin: {
              top: 0,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
          children: [
            new Paragraph({
              text: "",
              spacing: {
                before: 0, // No space before
                after: 0,  // No space after
              },
            }),
            new Paragraph({
              text: personalInfo.name,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER, // Center the heading
              spacing: {
                before: 0, // No space before
                after: 0,  // No space after
              },
            }),
            this.createContactInfo(personalInfo.mobile, personalInfo.linkedin, personalInfo.email),

            this.createHeading("Education and Qualifications"),
            ...educations
              .map(education => {
                const arr = [];
                arr.push(
                  this.createInstitutionHeader(
                    education.universityName,
                    `${education.startDate} - ${education.endDate}`
                  )
                );
                arr.push(
                  this.createRoleText(
                    `${education.relevantCourses} - ${education.degreeName}`
                  )
                );
                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),

            this.createHeading("Work Experience"),

            ...workExperiences
              .map(position => {
                const arr = [];
                arr.push(
                  this.createInstitutionHeader(
                    position.companyName,
                    this.createPositionDateText(
                      position.startDate,
                      position.endDate,
                    )
                  )
                );
                arr.push(this.createRoleText(position.titlePositionHeld));

                const bulletPoints = this.splitParagraphIntoBullets(
                  position.workDescription
                );
                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });
                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),

            this.createHeading("Projects"),
            ...projects
              .map(project => {
                const arr = [];
                arr.push(
                  this.createInstitutionHeader(
                    project.title,
                    project.date
                  )
                );
                arr.push(this.createRoleText(project.position));

                const bulletPoints = this.splitParagraphIntoBullets(
                  project.description
                );
                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });
                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),

            this.createSubHeading("Interests"),
            this.createInterests(
              "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
            ),
          ]
        }
      ]
    });

    return document;
  }

  createContactInfo(phoneNumber, profileUrl, email) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1
        })
      ]
    });
  }

  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }

  createSubHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2
    });
  }

  createInstitutionHeader(institutionName, dateText) {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  createRoleText(roleText) {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  createBullet(text) {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0
      }
    });
  }

  // createSkillList(skills) {
  //   return new Paragraph({
  //     children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
  //   });
  // }

  createProjectsList(projects) {
    if (!projects || projects.length === 0) {
      return []; // Return an empty array if projects is null or empty.
    }
    return projects.map(
      project =>
        new Paragraph({
          text: project.title,
          bullet: {
            level: 0
          }
        })
    );
  }

  createInterests(interests) {
    return new Paragraph({
      children: [new TextRun(interests)]
    });
  }

  splitParagraphIntoBullets(text) {
    if (text === null) return [];
    return text.split('\n').filter(item => item.trim() !== '').map(item => item.replace(/^\d+\. /, ''));
  }

  createPositionDateText(startDate, endDate) {
    return `${startDate} - ${endDate}`;
  }

  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
}


export default DocumentCreator
