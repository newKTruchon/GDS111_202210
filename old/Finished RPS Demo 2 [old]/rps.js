
//Array that will store the actual images that are used

var pics=new Array();

pics[0]="images/rock.jpg";
pics[1]="images/paper.jpg";
pics[2]="images/scissors.jpg";

//Array that stors the highlighted images

var pics2=new Array();

pics2[0]="images/rock2.jpg";
pics2[1]="images/paper2.jpg";
pics2[2]="images/scissors2.jpg";


// Array that stores the player Id and Computers Id choices

//Player ID's

var pId=new Array("rock_p","paper_p","scissors_p");

//Computer ID's

var cId=new Array();

cId[0]="rock_c";
cId[1]="paper_c";
cId[2]="scissors_c";


// function that will swap the regular images to the highlighted versions

function swap(id,image) {
	document.getElementById(id).src=image;
	
}

// Play function ---------------------------------------------------------------

function play(id) {
	
	swap(pId[0],pics[0]);
	swap(pId[1],pics[1]);
	swap(pId[2],pics[2]);
	
	swap(cId[0],pics[0]);
	swap(cId[1],pics[1]);
	swap(cId[2],pics[2]);
	
	
	// var the stores are choices
	
	var p_choice=id;
	
	var c_choice=id;
	
	// Math.floor round downthe choices that the compuer is going to make
	
	var c_choice=Math.floor(Math.random()*2.9);
	
	swap(pId[p_choice],pics2[p_choice]);
	swap(cId[c_choice],pics2[c_choice]);
	
	// switch
	
	switch(p_choice) {
		
		case 0:
		if(c_choice==0) {
			alert("Bloody Hell it's a Draw");
			
		} 
		else if(c_choice==1) {
				alert("I hate losing to Computers!");
			
		} 
		else {
			alert("You Suck!");
			
		}
		
		break;
		
		case 1:
		
		if(c_choice==0) {
			alert("I Win You Bastard!");
			
		} else if(c_choice==1) {
			
			alert("Tie!");
		}else {
			
			alert("Godzilla");
		}
		break;
		
		//default:
		case 2:
		
		if(c_choice==0){
			
			alert("Led Zeppelin");
			
		}else if(c_choice==1) {
			
			alert("");
		}else {
			
			alert("");
			
		}
		break;
		
		
	} // end switch
	
	
	
	
} // end play function

















