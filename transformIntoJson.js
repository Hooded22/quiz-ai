const fs = require('fs');

function getQuestionId(question) {
    return parseInt(question.match(/Q(\d+)/)[1]);
}

function transformIntoJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    const newJsonData = jsonData.questions.map((item, index) => {
        const id = getQuestionId(item);

        return {
            id,
            title: item,
            answer: jsonData.answers.find(a => a.match(new RegExp(`^A${id}:`)))?.replace(new RegExp(`^A${id}:\\s*`), '') || undefined
        }
    })

    console.log(JSON.stringify(newJsonData, null, 2));

}

transformIntoJson('app/json/javascript.json');