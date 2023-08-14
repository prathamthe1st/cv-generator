const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
// const multer = require("multer");
const path = require("path");
const cors = require("cors");
// const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const envFilePath = path.resolve(__dirname, '..', '.env');

require("dotenv").config({ path: envFilePath });

const generateID = () => Math.random().toString(36).substring(2, 10);


/*
	?So, when the generateID function is called, it generates a random number between 0 and 1, converts it to a base-36 string, 
	?and extracts a substring to create a unique identifier consisting of alphanumeric characters. This identifier can be used, 
	?for example, to assign a unique ID to a data entry in a database or to create a temporary identifier for some process.
*/

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "uploads");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	},
// });

/*
	?This code sets up the configuration for storing uploaded files using Multer. 
	?It specifies the destination folder where files will be saved and generates a unique filename for each file 
	?based on the current timestamp and the original file extension.
*/

// const upload = multer({
// 	storage: storage,
// 	limits: { fileSize: 1024 * 1024 * 5 },
// });

/*
	?This code initializes the Multer middleware with the previously defined storage configuration. 
	?It sets a limit on the file size to 5 megabytes (5MB). It prepares the middleware for handling file 
	?uploads and applies the storage and size limit settings.
*/

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const ChatGPTFunction = async (text) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: text,
		temperature: 0.5,
		max_tokens: 160,
		top_p: 1,
		frequency_penalty: 1,
		presence_penalty: 1,
	});
	return response.data.choices[0].text;
};

/*
	?Explaination for the parameters used in the ChatGPTFunction:

	?1. model: "text-davinci-003": Specifies the model to be used for generating the completion (in this case, "text-davinci-003").

	?2. prompt: text: Sets the text prompt for the completion, which serves as the starting point for generating the response.

	?3. temperature: 0.6: Controls the randomness of the generated output, with higher values producing more random responses.

	?4. max_tokens: 250: Limits the length of the generated completion to a maximum of 250 tokens.

	?5. top_p: 1: Sets the cumulative probability threshold for the generated tokens, ensuring that the response is within the specified probability.

	?6. frequency_penalty: 1: Adjusts the penalty applied to frequently used tokens, reducing their likelihood in the generated response.

	?7. presence_penalty: 1: Controls the penalty applied to infrequently used tokens, encouraging their inclusion in the generated completion.
*/

app.post("/cv", async (req, res) => {

	const {
		personalInfo,
		educations,
		workExperiences,
		projects,
		otherInfo
	} = req.body;

	const workExperiencesText = async () => {
		console.log("Work Ex is Running")
		for (let i = 0; i < workExperiences.length; i++) {

			let work_prompt1 = `I am writing a resume. I worked as a ${workExperiences[i].titlePositionHeld} at ${workExperiences[i].companyName}.${workExperiences[i].description}. I want you to act as a CV writing expert with immense industrial knowledge and provide 4 impactful points for the description of my role while following the instructions below:\n 
			1. Quantify the experience wherever possible. \n
			2. Go in-depth in the responsibilities and show a strong skillset and domain knowledge \n
			3. Make the overall experience more impactful by using relevant names of tools, frameworks, processes, etc. \n
			4. Use a maximum number of action words.`

			let work_response1 = await ChatGPTFunction(work_prompt1);
			console.log(`Work Experience ${i+1} Response 1 from Model: `, work_response1)

			let work_prompt2 = `${work_response1}\n\n Enhance these 4 points but dont increase the word count.`
			let work_response2 = await ChatGPTFunction(work_prompt2);

			console.log(`Work Experience ${i+1} Response 2 from Model: `, work_response2)

			workExperiences[i].workDescription = work_response2;
		}
	};

	const createWorkExperience = async () => {
		const userWorkPrompt = "Create a work experience for me. I work at Google as a Business Analyst"

		const create_work_response1 = await ChatGPTFunction(userWorkPrompt);

		console.log("Create Work Experience Response 1 from Model: ", create_work_response1)

		let work_prompt1 = `${create_work_response1}\n\nThe experience you made up was generic.I want you to act as a CV writing expert with immense industrial knowledge and provide 4 points while following the instructions below:
			1. Dont include the Company Name and Job Title in the description.\n
			2. Quantify the experience wherever possible.\n
			3. Go in-depth in the responsibilities and show a strong skillset and domain knowledge\n 
			4. Make the overall experience more impactful by using relevant names of tools, frameworks, processes, etc.n\n
			5. Use a maximum number of action words.`

		let create_work_response2 = await ChatGPTFunction(work_prompt1);

		console.log("Create Work Experience Response 2 from Model: ", create_work_response2)

		// let work_prompt2 = `${create_work_response2} I can see that you have still not implemented all the instructions. Please go over your response again and give me the best possible output making sure none of my instructions were missed. `
		let work_prompt2 = `${create_work_response2} Enhance these 4 points and dont increase the word count.`

		let create_work_response3 = await ChatGPTFunction(work_prompt2);

		console.log("Create Work Experience Response 3 from Model: ", create_work_response3)

		// workExperiences[i].workDescription = create_work_response3;
	};

	const projectsText = async () => {
		console.log("Projects is Running")
		for (let i = 0; i < projects.length; i++) {
			console.log("Project ", i + 1, " : ", projects[i].title)
			let project_prompt1 = `I am writing a resume. I made a ${projects[i].title} when my role was a ${projects[i].position}. ${projects[i].description}.Provide 4 impactful points as a CV writing expert with immense industrial knowledge while following the instructions below: \n
			1. Quantify the project wherever possible. \n
			2. Use more action keywords\n
			3. Make a mention of any relevant tools and frameworks if necessary.\n
			4. Add the impactful points at the start itself and highlight specific skills.`

			let project_response1 = await ChatGPTFunction(project_prompt1)
			console.log(`Project ${i+1} Response 1 from Model: `, project_response1)

			let project_prompt2 = `${project_response1} \n\n Enhance these 4 points and dont increase the word count.`
			let project_response2 = await ChatGPTFunction(project_prompt2);
			console.log(`Project ${i+1} Response 2 from Model: `, project_response2)

			projects[i].description = project_response2;
		} 
	};
	const createProject = async () => {
		const userProjectPrompt = "Create a project for me. I made a project on Machine Learning"
		const create_project_response1 = await ChatGPTFunction(userProjectPrompt);

		console.log("Response 1 from Model: ", create_project_response1)

		let create_project_prompt1 = `${create_project_response1}\n\nThe output you made up was generic. Please act as a CV writing expert with immense industrial knowledge to personalize it and follow the following instructions: 
		1. Dont include the Project Name in the description.
		2. Quantify the experience wherever possible. 
		3. Use more action keywords
		4. Add the impactful points at the start itself and highlight specific skills. 
		5. Make a mention of any relevant tools and frameworks if necessary.`	
		
		let create_project_response2 = await ChatGPTFunction(create_project_prompt1);
		console.log("Response 2 from Model: ", create_project_response2)
	};

	await Promise.all([workExperiencesText(), projectsText()]);
	// await Promise.all([workExperiencesText(), projectsText(), createWorkExperience(), createProject()]);

	const newEntry = {
		id: generateID(),
		personalInfo,
		educations,
		workExperiences,
		projects,
		otherInfo
	};

	res.json({
		message: "Request successful!",
		data: newEntry
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
