const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

require("dotenv").config();

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
		temperature: 0.6,
		max_tokens: 250,
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
		for (let i = 0; i < workExperiences.length; i++) {
			console.log("Processing work experience:", workExperiences[i]);
			console.log("Company name:", workExperiences[i].companyName);
			console.log("Title position held:", workExperiences[i].titlePositionHeld);

			let prompt1 = `I am writing a resume, I worked at  ${workExperiences[i].companyName} as a ${workExperiences[i].titlePositionHeld}  \n Can you write me 25 words enhancing my role in this company (in first person)?`;
			let response1 = await ChatGPTFunction(prompt1);
			console.log("Response from AI model:", response1);

			// Update the workDescription of the original object in the array
			workExperiences[i].workDescription = response1;
		}
	};
	const projectsText = async () => {
		for (let i = 0; i < projects.length; i++) {
			let prompt2 = `I am writing a resume, I worked on  ${projects[i].title} project. ${projects[i].description}  \n Can you write me 25 words enhancing this project and its description (in first person)?`
			let response2 = await ChatGPTFunction(prompt2)
			projects[i].description = response2
		}
	};
	workExperiencesText()
	await Promise.all([workExperiencesText(), projectsText()]);
	// projectsText()

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
