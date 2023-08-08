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

  class DocumentCreator {
    create([personalInfo, workExperiences, educations, projects,otherInfo]) {
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
                  before: 0, 
                  after: 0,  
                },
              }),
              new Paragraph({
                text: personalInfo.name,
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER, 
                spacing: {
                  before: 0, 
                  after: 0,  
                },
              }),
              this.createContactInfo(personalInfo.mobile, personalInfo.linkedin, personalInfo.email),
              
              new Paragraph({
                text: "",
                spacing: {
                  after: 200, // Adjust the spacing value as needed (in twips - 1/20 of a point)
                },
              }),


              this.createHeading("Education"),
              ...educations
                .map(education => {
                  const arr = [];
                  arr.push(
                    this.createInstitutionHeader(
                      education.universityName,
                      `${education.startDate} - ${education.endDate}`,
                      `${education.city}, ${education.country}`
                    )
                  );
                  arr.push(
                    this.createRoleText(
                      `Majors in ${education.degreeName},Honours in ${education.relevantCourses
                      } | GPA: ${education.gpa}`,
                      education.relevantCourses
                    )
                  );
                  return arr;
                })
                .reduce((prev, curr) => prev.concat(curr), []),

                new Paragraph({
                  text: "",
                  spacing: {
                    after: 200, // Adjust the spacing value as needed (in twips - 1/20 of a point)
                  },
                }),

              this.createHeading("Work Experience"),

              ...workExperiences
                .map(position => {
                  const arr = [];
                  arr.push(
                    this.createInstitutionHeader(
                      position.companyName,
                      `${position.startDate} - ${position.endDate}`,
                      `${position.city}, ${position.country}`
                      
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

                new Paragraph({
                  text: "",
                  spacing: {
                    after: 200, // Adjust the spacing value as needed (in twips - 1/20 of a point)
                  },
                }),

              this.createHeading("Projects"),
              ...projects
                .map(project => {
                  const arr = [];
                  arr.push(
                    this.createInstitutionHeader(
                      project.title,
                      project.date,
                      `${project.city}, ${project.country}`
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

                new Paragraph({
                  text: "",
                  spacing: {
                    after: 200, // Adjust the spacing value as needed (in twips - 1/20 of a point)
                  },
                }),
              

                this.createHeading("Skills and Languages"),
                this.createSubHeading("Skills"),
                this.createSkillList(otherInfo.skills),
                this.createSubHeading("Languages"),
                this.createLanguageList(otherInfo.languages),

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
        ]
      });
    }

    createHeading(text) {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true,
        spacing: {
          after: 200, // Adjust the spacing value as needed (in twips - 1/20 of a point)
        },
      });
      
    }

    createSubHeading(text) {
      return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
        size:32,
        spacing: {
          after: 100, 
        },
      });
    }

    createInstitutionHeader(institutionName, dateText, location) {
      
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
            bold: true,
            size:24
          }),
          new TextRun({
            text: `, ${location}`,
            size:22
          }),
          new TextRun({
            text: `\t${dateText}`,
            bold: true,
            size:22
          })
        ]
      });
    }

    createRoleText(roleText) {
      return new Paragraph({
        children: [
          new TextRun({
            text: roleText,
            italics: true,
            size:22
          })
        ]
      });
    }

    createBullet(text) {
      return new Paragraph({
        text: text,
        size:18,
        bullet: {
          level: 0
        }
      });
    }

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


    createSkillList(skills) {
      return new Paragraph({
        children: [new TextRun(skills)]
      });

    }

    createLanguageList(languages) {
      return new Paragraph({
        children: [new TextRun(languages)]
      });
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
