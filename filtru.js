document.getElementById('cauta').onclick = function(ev) {
	ev.preventDefault();
	filtrare_continut();	
}

function filtrare_continut() {
	let search_val = document.getElementById('search').value.trim().toLowerCase();
	// afisam eroare doar daca userul introduce 1 sau 2 caractere
	if (search_val.length == 1 || search_val.length ==2) {
		document.querySelector('small').style.visibility = 'visible';
	} else {
		document.querySelector('small').style.visibility = 'hidden';
	}
	let pret_val = document.getElementById('pret').value.trim();	
	let model_sel = document.getElementById('model').value;
	let proc_sel = document.getElementById('procesor').value;
	let pret_radio = document.querySelector('input[type="radio"][name="pret"]:checked').value; // 'min' sau 'max'
	
	let div_els = document.querySelectorAll('div.laptop');
	
	for (let i = 0; i < div_els.length; i++) {
		let div_el = div_els[i];
		
		let model_el = div_el.getAttribute('data-model');
		let proc_el = div_el.getAttribute('data-proc');
		let pret_el = div_el.getAttribute('data-price');
		let denumire_el = div_el.getAttribute('data-title');
		let descriere_el = div_el.getAttribute('data-details');
		
		let model_cond = (model_sel == 'all') || (model_sel == model_el);
		let proc_cond = (proc_sel == 'all') || (proc_sel == proc_el);
		let pret_cond;
		if (pret_radio == 'max') {
			pret_cond = (pret_val.length) == 0 || isNaN(pret_val) || (pret_val <= 0) || (Number(pret_el) <= Number(pret_val));
		} else if (pret_radio == 'min') {
			pret_cond = (pret_val.length) == 0 || isNaN(pret_val) || (pret_val <= 0) || (Number(pret_el) > Number(pret_val));
		}
		// campul de search va fi ignorat daca lungimea lui esta < 3 caractere
		let search_cond = (search_val.length < 3) || (denumire_el.toLowerCase().indexOf(search_val) != -1) || (descriere_el.toLowerCase().indexOf(search_val) != -1);
		
		if (model_cond && proc_cond && pret_cond && search_cond) {
			div_el.style.display = 'block';
		} else {
			div_el.style.display = 'none';
		}		
	}
	//ordoneaza();
	show_results();	
}

function show_results() {
	let results_el = document.getElementById('results');
	let div_els = document.querySelectorAll('div.laptop');	
	let rez = 0;
	for (let i = 0; i < div_els.length; i++) {
		let div_el = div_els[i];
		if (div_el.style.display == 'block') {
			rez++;
		}
	}
	results_el.innerHTML = `Numarul total de rezultate:<b style="font-size:24px"> ${rez}</b>`;	
}

//function ordoneaza() {}


