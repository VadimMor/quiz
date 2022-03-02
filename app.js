const option1 = document.querySelector('.option1'),
		option2 = document.querySelector('.option2'),
		option3 = document.querySelector('.option3'),
		option4 = document.querySelector('.option4');
const options = document.querySelectorAll('.option');
const question = document.querySelector('.question');
const numberOfQuestion = document.querySelector('.number-of-question');
const numberOfAllQuestions = document.querySelector('.number-of-all-questions');

let indexOfQuestion,
		indexOfPage = 0;

const answersTracker = document.querySelector('.answer-tracker');
const btnNext = document.querySelector('.btn-next');

let score = 0;

const questions = [
	{
		question: 'Как в JS Вычислить процент от числа?',
		options: [
			'Так в JS нельзя делать',
			'%',
			'Умножить на кол-во процентов и разделить на 100',
			'Вызвать метод findPrecent()',
		],
		rightAnswer: 2
	},
	{
		question: 'Результат выражения "13" + 7',
		options: [
			'137',
			'20',
			'NaN',
			'error',
		],
		rightAnswer: 0
	},
	{
		question: 'На JS нельзя писать',
		options: [
			'Игры',
			'Скритпы для сайтов',
			'Десктопные приложения',
			'Плохо',
		],
		rightAnswer: 3
	},
]

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;
	indexOfPage++;
}

let completeAnswers = []

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if (indexOfPage == questions.length) {
		quizOver()
	} else {
		if (completeAnswers.length > 0) {
			completeAnswers.forEach(item => {
				if (item == randomNumber) {
					hitDuplicate = true;
				}
			})
			if (hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
				completeAnswers.push(indexOfQuestion);
			}
		}
		if (completeAnswers == 0) {
			indexOfQuestion = randomNumber;
			load();
			completeAnswers.push(indexOfQuestion);
		}
	}
};

const checkAnswer = (el) => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
		el.target.classList.add('correct');
		uptaeAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		uptaeAnswerTracker('wrong');
	}
	disabledOption();
}

const disabledOption = () => {
	options.forEach(option => {
		option.classList.add('disabled');
		if (option.dataset.id == questions[indexOfQuestion].rightAnswer) {
			option.classList.add('correct')
		}
	});
}

const enableOptions = () => {
	options.forEach(option => {
		option.classList.remove('disabled', 'correct', 'wrong');
	});
}

const answerTracker = () => {
	questions.forEach(() => {
		let answerTrackerItem = document.createElement('div');
		answersTracker.appendChild(answerTrackerItem);
	})
}

const uptaeAnswerTracker = (status) => {
	answersTracker.children[indexOfPage - 1].classList.add(status)
}

const validate = () => {
	if (!options[0].classList.contains('disabled')) {
		alert("Ответе")
	} else {
		enableOptions();
		randomQuestion()
	}
}

for(option of options) {
	option.addEventListener('click', el => {checkAnswer(el)});
}

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})

const quizOver = () => {
	document.querySelector('.popup').classList.add('active');
	document.querySelector('.correct-answer').innerHTML = score;
	document.querySelector('.all-questions').innerHTML = questions.length;
}

const again = () => {
	window.location.reload()
}

btnNext.addEventListener('click', () => {
	validate()
})

document.querySelector('.btn-again').addEventListener('click', () => {again()})