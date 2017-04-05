var obj = {
	"standard": 0,
	"fak_miet_ausfall": 0.1,
	"hh": 500,
	"erw_pers": 300,
	"ki_pers": 150, 
	"bew_verm": 1,
	"bew_eig": 2,
	"schnellT": 5,
	"mittelT": 3,
	"langT": 1,

	reset_1: function () {
		$("#einnahmen, #ausgaben, #sonstige_angaben").each(function () {
			$("input", $(this)).each(function () {
				$(this).val($(this).attr("value"));
				$(this).css("backgroundColor", "white");
			});
		});
		$("#bish_miete").prop("checked", true);
		$("#bish_spar").prop("checked", false);
		$("#rech_ueberschuss, #ans_ueberschuss, #einsatz").val("value");
		$("#ans_ueberschuss").css("border", "solid 1px black");

	},

	ueberschuss: function () {
	    if ($("#geh1").val() == "") {
		obj.set("geh1");
		fehler = true;
	    }else{
		obj.plausi_ueberschuss();
		obj.einahmen();
		obj.ausgaben();
		obj.r_u();
		obj.m_u(); // BIN GERADE HIER!!!!!
	    }
	    
	},

	plausi_ueberschuss: function () {
		for (i = 0; i < 3; i++) {
			var f = document.forms[i];
		}
		var fehler = false;
		meldungenLeeren();
		//Zusammenfassen?
        		if ($("#mietE").val() > 0 && $("#wf_verm").val() < 1) {
        			obj.set("wf_verm");
        			fehler = true;
        		}
        		if ($("#lhk").val() == "") {
        			obj.set("lhk");
        			fehler = true;
        		}
        
        		if ($("#erw").val() == "" | $("#erw").val() < 1) {
        			obj.set("erw");
        			fehler = true;
        		}
        		if (!fehler) {
        			fehler = false;
        		} else {
        			fehler = false;
        			return false;
        		}
		function meldungenLeeren() {
			//Lösung mit JQuery? // 
			//$("#geh1", "#lhk", "#erw").each(function () { $(this).css("backgroundColor", "white"); })
			$("#geh1").css("backgroundColor", "white");
			$("#wf_verm").css("backgroundColor", "white");
			$("#lhk").css("backgroundColor", "white");
			$("#erw").css("backgroundColor", "white");
		}

	},

	set: function (id) {
		debugger;
		$("#" + id).css("backgroundColor", "red").focus();
		//$("#" + id).val(FEHLER);

	},

	einahmen: function () {
		ergE = 0;
		$("#einnahmen").each(function () {
			$("input", $(this)).each(function () {
				if ($(this).val() == "") {
					var e = 0;
				} else {
					e = parseFloat($(this).val());
				}
				ergE += e;
			});
		});
		return ergE;
	},

	ausgaben: function () {
		ergA = 0;
		$("#ausgaben").each(function () {
			$("input", $(this)).each(function () {
				if ($(this).val() == "") {
					var a = 0;
				} else {
					a = parseFloat($(this).val());
				}
				ergA += a;
			});
		});

		if ($("#bish_miete").is(":checked") & $("#mietA").val() > 0) {
			ergA = ergA - parseFloat($("#mietA").val());
		}

		if ($("#bish_spar").is(":checked") & $("#spar").val() > 0) {
			ergA = ergA - parseFloat($("#spar").val());
		}
		return ergA;
	},

	r_u: function () {
		var r_u = ergE - ergA;
		$("#rech_ueberschuss").val(r_u.toFixed(2));
	},

	m_u: function () {
		if ($("#mietE").val() > 0) {
			var mietEAbschl = $("#mietE").val() * obj.fak_miet_ausfall;
		} else {
			mietEAbschl = 0;
		}

		var ans_lhk = obj.hh + $("#erw").val() * obj.erw_pers + $("#ki").val() * obj.ki_pers;

		if ($("#lhk").val() < ans_lhk) {
			var lhk_aufschl = ans_lhk - $("#lhk").val();
		} else {
			lhk_aufschl = 0;
		}

		if ($("#wf_verm").val() > 0) {
			var abschl_bew_verm = $("#wf_verm").val() * obj.bew_verm;
		} else {
			abschl_bew_verm = 0;
		}

		if ($("#wf_eigen").val() > 0) {
			var abschl_bew_eigen = $("#wf_eigen").val() * obj.bew_eig;
		} else {
			abschl_bew_eigen = 0;
		}

		var ans_bew = abschl_bew_verm + abschl_bew_eigen;

		if ($("#bew").val() < ans_bew) {
			var bew_aufschl = ans_bew - $("#bew").val();
		} else {
			bew_aufschl = 0;
		}

		var ansetzbarer_ueberschuss = $("#rech_ueberschuss").val() - mietEAbschl - lhk_aufschl - bew_aufschl;
		$("#ans_ueberschuss").val(ansetzbarer_ueberschuss.toFixed(2));

		if (ansetzbarer_ueberschuss < 0) {
			$("#ans_ueberschuss").css({
				"border": "solid 2px red",
				"color": "red"
			})
		} else {
			$("#ans_ueberschuss").css({
				"border": "solid 2px green",
				"color": "green"
			});
			$("#einsatz").val(ansetzbarer_ueberschuss.toFixed(2)).css("border", "solid 2px green");
		}
	},

	reset_2: function () {
		$("#auswertung, #laufzeit").each(function () {
			$("input", $(this)).each(function () {
				$(this).val($(this).attr("value"));
				$(this).css({
					"backgroundColor": "white",
					"border": "solid 1px black"
				});
			});
		});
		$("#schnell").prop("checked", false);
		$("#mittel").prop("checked", true);
		$("#lang").prop("checked", false);
		$("#kreditvolumen").val("value");
		kredit = "";
		$("#ek").val("value");

	},

	kreditrahmen: function () {
		var tilgungsSatz = 0;
		if ($("#schnell").is(":checked")) {
			tilgungsSatz = obj.schnellT;
		}
		if ($("#mittel").is(":checked")) {
			tilgungsSatz = obj.mittelT;
		}
		if ($("#lang").is(":checked")) {
			tilgungsSatz = obj.langT;
		}

		if ($("#einsatz").val() == "" | $("#zinsen").val() == "") {
			alert("Bitte Kreditrate und einen geschätzten Zinssatz eingeben!");
		} else {
			kredit = $("#einsatz").val() * 1200 / (parseFloat(tilgungsSatz) + parseFloat($("#zinsen").val()));
		}
		$("#kreditvolumen").val(kredit.toFixed(2));
	},

	reset_3: function () {
		$("#nk").each(function () {
			$("input", $(this)).each(function () {
				$(this).val($(this).attr("value"));
			});
		});
		$("#kreditvolumen").val("");
		$("#kp_erg").val("");
		$("#sonstige_nk").val("value");
		$("#zusatzinfos").text("");	
	},

	kp: function () {
		if ($("#kreditvolumen").val() == "") {
			var kreditmittel = 0;
		} else {
			kreditmittel = $("#kreditvolumen").val();
		}
		if ($("#ek").val() == "") {
			var eigenmittel = 0;
		} else {
			eigenmittel = $("#ek").val();
		}
		if ($("#sonstige_nk").val() == "") {
			var sonstige_kosten = 0;
		} else {
			sonstige_kosten = $("#sonstige_nk").val();
		}

		if ($("#gest").val() == "") {
			var gest1 = obj.standard;
		} else {
			gest1 = $("#gest").val();
		}
		if ($("#notar_gb").val() == "") {
			var notar_gb1 = obj.standard;
		} else {
			notar_gb1 = $("#notar_gb").val();
		}
		if ($("#makler").val() == "") {
			var makler1 = obj.standard;
		} else {
			makler1 = $("#makler").val();
		}
		var gesamtkosten = parseFloat(kreditmittel) + parseFloat(eigenmittel);
		var kosten = gesamtkosten - sonstige_kosten;
		var nebenkosten = parseFloat(gest1) + parseFloat(notar_gb1) + parseFloat(makler1);		
		var kp = kosten / (100 + nebenkosten) * 100;
		$("#kp_erg").val(kp.toFixed(2));
		
		//////////////////////////////
		
		var erf_nk = kp * nebenkosten / 100;
				
		if (eigenmittel < erf_nk) {
			$("#zusatzinfos").text("Der Eigenkapitaleinsatz ist für die Zahlung der Nebenkosten (GESt, Notar und Grundbuchamt sowie ggf. Makler) nicht ausreichend! Eine Kreditvergabe scheint eher unrealistisch.").css("color", "red"); //+  Es sollten mindestens " + erf_nk.toFixed(2) + " bei diesem Projekt zur Verfügung stehen. 
		} 
		if (eigenmittel > erf_nk) {
			$("#zusatzinfos").text("Hura, aufgrund des Eigenkapitaleinsatzes können mind. die anfallenden Nebenkosten (GESt, Notar-/Grundbuchkosten und ggf. Makler) gezahlt werden. Eine Finanzierung scheint grundsätzlich möglich.").css("color", "green");			
		} 
		if (kp < .01) {
			$("#zusatzinfos").text("");	
		}
	},

	//bin hier
	info: function () {
//		var blw = $("#kp_erg").val() * .9;
//		var blw06 = blw * .6;
//		var blw08 = blw * 08;
//		var blw11 = blw * 1.11;
	}
	



};
///////////////////////////////////////////////////////////////////////////

$(function () {
	$("#ueberschuss").click(obj.ueberschuss);
	$("#reset_1").click(obj.reset_1);
	$("#kreditrahmen").click(obj.kreditrahmen);
	$("#reset_2").click(obj.reset_2);
	$("#kp").click(obj.kp);
	$("#reset_3").click(obj.reset_3);
});

///////////////////////////////////////////////////////////////////////////
