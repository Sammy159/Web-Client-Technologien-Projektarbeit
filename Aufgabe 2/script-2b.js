var fragen = [
	{
		"quid":1,
		"question": "HTML ist eine Programmiersprache",
		"answerList":["stimmt","stimmt nicht"],
		"solution":[1],
		"type":"selectable"

	}, {
		"quid":2,
		"question": "Um aktuelle Webseiten implementieren zu können benötige ich...",
		"answerList":["HTML","CSS","JavaScript"],
		"solution":[0,1,2],
		"type":"checkbox"
	}, {
		"quid":3,
		"question": "Ist es wichtig, bei HTML und JavaScript auf Groß- und Kleinschreibung zu achten?",
		"answerList":["HTML nein, JavaScript schon","HTML ja, JavaScript nein","beide nein","beide ja"],
		"solution":[0],
		"type":"singleSolution"
	},{
		"quid":4,
		"question":"HTML Tags sind stets umschlossen von: ",
		"answerList":["Unterstrichen","Spitzen Klammern","Rauten"],
		"solution":[1],
		"type":"selectable"
	},{
		"quid":5,
		"question":"Welche der beiden genannten ist die aktuelle offizielle Spezifikation des W3C?",
		"answerList":["HTML 5.2", "HTML 5.3"],
		"solution":[0],
		"type":"selectable"
	},{
		"quid":6,
		"question":"Welches vormals populäre Element ist in HTML5 nicht länger vorhanden?",
		"answerList":["table","frame","body"],
		"solution":[1],
		"type":"selectable"
	},{
		"quid":7,
		"question":"Kann es sinnvoll sein, JavaScript nicht im Kopf, sondern im Fuß der Seite zu laden? ",
		"answerList":["Ja, alles was im Header geladen wird verlangsamt den Aufbau der eigentlichen Seite","Nein, denn nur was im Kopf geladen wird, funktioniert auch.","Es kommt darauf an, ob die Webview-Engine von unten oder oben befüllt wird. "],
		"solution":[2],
		"type":"singleSolution"
	},{
		"quid":8,
		"question":"Was bewirkt das HTML-Attribut autocapitalize? ",
		"answerList":["Es regelt wertabhängig die Großschreibung in Formularfeldern. ","Es verkauft automatisiert deine Bitcoin bei einem definierten Wertabfall. ","Dieses Attribut gibt es nicht. "],
		"solution":[0],
		"type":"singleSolution"
	}
];

/*Variable fürs Speichern der Antworten, schon als leere Arrays als Basis
Bei der 5. Frage ist die 0 bereits vorgespeichert, da die Antwort, die automatisch
vorausgewählt ist, die richtige ist. Dadurch wird die Frage auch als richtig angezeigt,
wenn der Benutzer bei dieser Frage nichts ändert, da er sieht, dass die richtige Antwort schon ausgewählt ist.*/
var antworten = {1:[], 2:[], 3:[], 4:[], 5:[0], 6:[], 7:[], 8:[]};


//Überschrift
var docH1 = document.createElement("H1");
var textH1 = document.createTextNode("Aufgabe 2 WCT");
docH1.appendChild(textH1);
document.body.appendChild(docH1);



//Die Quizelemente sind in einer Funktion, da ich das als übersichtlicher empfinde
function erstelleQuiz(){

//Das "t" bei den Variablennamen steht für "temporär"

for(let k=0; k<fragen.length; k++)
{

	var frageK = fragen[k];	//Aktuelle Frage speichern

	//Div erzeugen
	var questionID = frageK["quid"];
	let tDiv = document.createElement("DIV");
	var attr = document.createAttribute("class");
	attr.value = "frage";
	tDiv.setAttributeNode(attr);
	attr= document.createAttribute("id");
	attr.value = questionID;
	tDiv.setAttributeNode(attr);
	document.body.appendChild(tDiv);

	var docDiv = document.getElementsByClassName("frage");	//Alle Divs holen

	//Fragetext erstellen
	var question = frageK["question"];
	let tp = document.createElement("P");
	let tem = document.createElement("EM");
	let tpText = document.createTextNode(question);
	tem.appendChild(tpText);
	tp.appendChild(tem);
	docDiv[k].appendChild(tp);


	//Antwort
	//Antwortart speichern
	var type = frageK["type"];

	var answers = frageK["answerList"];
	//switch für verschiedene Typen
	switch(type){
		//type == selectable
		case "selectable":
			//select tag erstellen
			let tselect = document.createElement("SELECT");
			attr = document.createAttribute("class");
			attr.value = type;
			tselect.setAttributeNode(attr);
			//alle Antworten erstellen
			for(let i = 0; i<answers.length; i++)
					{
						let toption = document.createElement("OPTION");
							toption.addEventListener("click",function(){
								//Da zwischen <option> und <div> noch ein Tag dazwischen ist,
								//muss man zwei mal die parentNode suchen um an die Div ID zu gelangen.
								let parent1 = toption.parentNode;
								let parent2 = parent1.parentNode;
								//Div Id speichern
								let id = parent2.getAttribute("id");
								//Antworten Id speichern
								let value = toption.getAttribute("id");
								//Wenn das Array leer ist, soll die Antwort gespeichert werden
								if(antworten[id].length < 1) antworten[id].push(Number(value));
								//Wenn nicht, soll zuerst die vorherige Antwort gelöscht werden
								else {antworten[id].splice(0,1);  antworten[id].push(Number(value));}
								console.log(antworten);
							});
						let tvalue = document.createAttribute("value");
						tvalue.value = answers[i];
						toption.setAttributeNode(tvalue);
						tvalue = document.createAttribute("id");
						tvalue.value = i;
						toption.setAttributeNode(tvalue);
						let toptText = document.createTextNode(answers[i]);
						toption.appendChild(toptText);
						tselect.appendChild(toption);
					}
			docDiv[k].appendChild(tselect);
			break;	//soll hier stoppen und keine weiteren cases ausführen

		case "checkbox":
			for(let i = 0; i<answers.length; i++)
				{
					let tinput = document.createElement("INPUT");
					tinput.addEventListener("click",function(){
							let parent = tinput.parentNode;
							//Div ID
							let id = parent.getAttribute("id");
							//Antwort ID
							let value = tinput.getAttribute("id");
							let counter = 0, change = 0;
							let tmpAntw = antworten[id];
							for(let i=0; i<antworten[id].length;i++){
								//Wenn die Antwort bereits vorhanden ist, soll diese gelöscht werden
								//aka zweiter Klick um Auswahl aufzuheben
								if(value == tmpAntw[i]){antworten[id].splice(counter,1); change++}
								counter++;
							}
							//Wenn nichts gelöscht wurde, ist die Antwort noch nicht vorhanden, also hinzufügen
							if(change == 0)	antworten[id].push(Number(value));
							console.log(antworten);
					});
					let tattr = document.createAttribute("type");
					tattr.value = type;
					tinput.setAttributeNode(tattr);
					tattr = document.createAttribute("value");
					tattr.value = answers[i];
					tinput.setAttributeNode(tattr);
					tattr = document.createAttribute("id");
					tattr.value = i;
					tinput.setAttributeNode(tattr);
					docDiv[k].appendChild(tinput);

					let tinputtext = document.createTextNode(answers[i]);
					docDiv[k].appendChild(tinputtext);
					tinputtext = document.createElement("BR");
					docDiv[k].appendChild(tinputtext);
				}
			break;

		case "singleSolution":
			for(let i = 0; i<answers.length; i++)
			{
				let tinput = document.createElement("INPUT");
				let tattr = document.createAttribute("type");
				tattr.value = "radio";
				tinput.setAttributeNode(tattr);
				tattr = document.createAttribute("value");
				tattr.value = answers[i];
				tinput.setAttributeNode(tattr);
				tattr = document.createAttribute("id");
				tattr.value = i;
				tinput.setAttributeNode(tattr);
				tinput.addEventListener("click", function(){
						let parent = tinput.parentNode;
						//Div ID
						let id = parent.getAttribute("id");
						//Antwort ID
						let value = tinput.getAttribute("id");
						//Gleiches Verfahren wie bei selectable
						//Da nur eine Antwort ausgewählt sein kann, muss die vorherige gelöscht werden, sobald eine neue ausgewählt wird
						if(antworten[id].length < 1) antworten[id].push(Number(value));
						else {antworten[id].splice(0,1);  antworten[id].push(Number(value));}
						console.log(antworten);
				});
				tattr = document.createAttribute("name");
				tattr.value = "frage"+k;
				tinput.setAttributeNode(tattr);
				docDiv[k].appendChild(tinput);

				let tinputtext = document.createTextNode(answers[i]);
				docDiv[k].appendChild(tinputtext);
				tinputtext = document.createElement("BR");
				docDiv[k].appendChild(tinputtext);
			}
	}
	}
}

erstelleQuiz(); //Aufrufen der Quizfunktion


//Auswertung

//Div für Button
let tDiv = document.createElement("DIV");
attr= document.createAttribute("id");
attr.value = "bAuswerten";
tDiv.setAttributeNode(attr);
document.body.appendChild(tDiv);

var divAusw = document.getElementById("bAuswerten");
let tBut = document.createElement("BUTTON");
let tattr = document.createAttribute("class");
tattr.value = "button";
tBut.setAttributeNode(tattr);
let tButtext = document.createTextNode("Fragebogen auswerten");
tBut.appendChild(tButtext);
tBut.addEventListener("click", function(){
		//Auswertefunktion
		//Alle Divs in Array speichern
		let docDiv = document.getElementsByClassName("frage");
		for(let j=1; j<=8; j++)
		{
			//Für weitere Schritte brauche ich nur das Array mit den richtigen Lösungen
			let tmpFrage = fragen[j-1];
			let aktFrage = tmpFrage["solution"];
			//Frage 2 ist automatisch richtig, wenn alle 3 Antworten angekreuzt wurden, die Reihefolge ist dafür egal
			if(j == 2 && (antworten[j].length>2))
			{
				let faerben = docDiv[j-1].firstChild;
				let fattr = document.createAttribute("style");
				fattr.value = "color: green";
				faerben.setAttributeNode(fattr);
			}
			//Bei allen anderen Fragen werden die Benutzerantworten mit den Lösungen verglichen
			//Hierzu ist die JSON Funktion hilfreich
			else if(JSON.stringify(antworten[j]) === JSON.stringify(aktFrage)){
				//grün färben
				let faerben = docDiv[j-1].firstChild;
				let fattr = document.createAttribute("style");
				fattr.value = "color: green";
				faerben.setAttributeNode(fattr);
			}
			else //rot färben
			{
				let faerben = docDiv[j-1].firstChild;
				let fattr = document.createAttribute("style");
				fattr.value = "color: red";
				faerben.setAttributeNode(fattr);
			}
		}
});
divAusw.appendChild(tBut); //Button an das richtige Div anhängen
