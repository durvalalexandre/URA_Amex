var version = "8.0.0";

/**
 * The base URL that is prepended to the URLs for all vox files.
 */
var promptBaseUrl = "../Resources/Prompts/pt-BR/extenso/";

var FalaCentavos = false;

/**
 * Dummy class to hold constants
 */
function Format() {}
new Format();

/*
 * These flags may be bitwise OR'd together to specfy the date output format
 */

/**
 * Flag to speak the month
 */ 
Format.prototype.SPEAK_MONTH = 1;

/**
 * Flag to speak the day
 */
Format.prototype.SPEAK_DAY = 2;

/**
 * Flag to speak both month and day.  This is a shortcut for
 * f.SPEAK_MONTH | f.speak_DAY
 */
Format.prototype.SPEAK_MONTH_AND_DAY = 3;

/**
 * Flag to speak the year
 */
Format.prototype.SPEAK_YEAR = 4;

/**
 * Flag to speak the day of the week
 */
Format.prototype.SPEAK_DAY_OF_WEEK = 8;

/**
 * Translates the value of the specified type into an array of
 * vox file URLs.  The array is a list of vox files that when
 * played in succession will represent the value of the specified
 * type in a locale-specific manner.  The following types are
 * supported:
 *
 * <table>
 * <tr><td>"boolean"</td><td>"true" or "false"</td></tr>
 * <tr><td>"date"</td><td>YYYYMMDD<br>Unspecified fields may
 *                                   be replaced by "??" or "????"</td></tr>
 * <tr><td>"digits"</td><td>A string of 0 or more characters [0-9]</td></tr>
 * <tr><td>"currency"</td><td>UUUMM.NN<br>Where UUU is the ISO4217 currency
 *                            code.  The currency code may be omitted, in
 *                            which case, the default currency for the
 *                            current locale will be used.</td></tr>
 * <tr><td>"number"</td><td>Positive or negative, integer or decimal
 *                          number</td></tr>
 * <tr><td>"phone"</td><td>Sequence of digits [0-9], optionally followed
 *                         by an "x" and extension digits [0-9]</td></tr>
 * <tr><td>"time"</td><td>hhmm[aph?]<br>"a" means AM, "p" means PM,
 *                        h means 24 hour, and ? means ambiguous</td></tr>
 * <tr><td>"ordinal"</td><td>A positive integer</td></tr>
 * <tr><td>"alphanumeric"</td><td>A string of digits [0-9] and US-ASCII
 *                                characters [A-Za-z]</td></tr>
 * <tr><td>"dtmf"</td><td>A string of zero or more DTMF characters
 *                        [0-9A-D*#]</td></tr>
 *
 * @param value The value to translate.
 * @param type The type of the value.
 * @param format The output format [optional].
 * @return An array of URL strings.
 */
function ptBRPlayBuiltinType(value, type, promptUrl, format)
{
    type = type.toLowerCase();
    // Sets the new base URL that is prepended to the URLs for all audio files.
//    if (!(typeof promptUrl == 'undefined'))
//    	promptBaseUrl = promptUrl;

    var format;
    FalaCentavos = false;
    switch (type) {
        case 'boolean':
            return booleanPrompts(value);
        case 'date':
            return datePrompts(value, format);
        case 'digits':
			return digitoadigito (value);
        case 'currency':
            return currencyPrompts(value);
        case 'number':
            return cardinalPrompts(value);
        case 'phone':
            return phonePrompts(value);
        case 'time':
            return timePrompts(value);
        case 'ordinal':
            return ordinalPrompts(value);
        case 'alphanumeric':
            return alphanumericPrompts(value);
        case 'dtmf':
            return dtmfPrompts(value);
        default:
            return void 0;
    }
}

function booleanPrompts(value)
{
    var promptsArray = new Array(1);

    if (value) {
        promptsArray[0] = promptBaseUrl + "miscellaneous/true.vox";
    } else {
        promptsArray[0] = promptBaseUrl + "miscellaneous/false.vox";
    }
    return promptsArray;
}

/**
 * Translates the date value into an array of vox file URLs
 * for playing the date.  The date must be in the ISO-8601
 * condensed format of YYYYMMDD.  One or more fields may be
 * left unspecified by substituting question mark characters
 * ("?") for a numeric value.  Output format will be in a
 * locale-specific ordering.   The format specification can
 * modify which fields are spoken.  If no format specification
 * parameter is given, the month and day are spoken.  Otherwise,
 * the date fields specified in the format specification will be
 * spoken.  Each output field is represented by a constant in the
 * Format class.  Multiple output fields are specified by 
 * bitwise OR'ing the appropriate constants.
 *
 * <pre>
 * Format f = new Format();
 * PlayBuiltinType("20020823", "date", f.SPEAK_MONTH |
 *                                     f.SPEAK_DAY |
 *                                     f.SPEAK_YEAR |
 *                                     f.SPEAK_DAY_OF_WEEK);
 * </pre>
 *
 * @param value The date in YYYYMMDD format.
 * @param format An optional format specification
 * @return An array of URL strings.
 */
function datePrompts(value, format)
{
	if (value.length < 4) {
		return void 0;
	}

	if (value.length = 4) {
		value=value.concat("0000");
	} else if (value.length = 6) {
		var i = "00";
		value=i.concat(value);
	}

    var day = value.substr(0, 2);
    var month = value.substr(2, 2);
	var year = value.substr(4, 4);
	
	var dayKnown = false;
	var monthKnown = false;
	var yearKnown = false;

	if (day > 0 && day < 32) 
	{
		var dayKnown = true;
	}
	if (month > 0 && month < 13) 
	{
		var monthKnown = true;
	}
	if (year > 0) 
	{
		var yearKnown = true;
	}

    var promptsArray;

    promptsArray = new Array();

	if (dayKnown) {
		promptsArray.push(promptBaseUrl + "data/dia_" + day + ".vox");
	}
	promptsArray = promptsArray.concat(monthPrompts(month, dayKnown, yearKnown));

	if (yearKnown) {
		promptsArray = promptsArray.concat(yearPrompts(year, monthKnown));
	}	
	return promptsArray;
}

/**
 * Translates the currency value into an array of vox file URLs
 * for playing the currency.  The currency amount must be a number
 * which may contain either a whole number part, or a decimal part, or
 * both, and is optionally preceeded by a currency specifier.  The
 * currency specifier may either be an ISO-4217 currency code, e.g.
 * USD, EUR, JPY, CHF, CAD, GBP, or MXN, or it may be one of the
 * following currency symbols: $ = USD, &#163; = GBP, &#8364; = EUR,
 * &#165; = JPY.  If no currency is specified, the currency of the
 * current locale will be used, e.g. USD for en-US, and EUR for fr-FR.
 *
 * @param value The currency amount.
 * @return An array of URL strings.
 */
function currencyPrompts(value)
{
    var currency;
    var valueStart;
    var decimalPoint;
    var fraction;
    var amount;

    if (value.charAt(0) == "$") {
        currency = "USD";
        valueStart = 1;
    } else if (value.charAt(0) == "\u00A3") {
        currency = "GBP";
        valueStart = 1;
    } else if (value.charAt(0) == "\u00A5") {
        currency = "JPY";
        valueStart = 1;
    } else if (value.charAt(0) == "\u20AC" || value.charAt(0) === "\u0080") {
        currency = "EUR";
        valueStart = 1;
    } else if (value.substring(0, 3).match(/^[A-Za-z][A-Za-z][A-Za-z]$/)) {
       currency = value.substring(0, 3);
       valueStart = 3;
    } else {
       currency = "REA";
       valueStart = 0;
    }

	if (currency == "REA") {
		if (value.length > 2) {		
			fraction = value.substr(value.length - 2, 2);
			amount = value.substr(0, value.length - 2);
		} else {
			fraction = value.substr(0, value.length);
			amount = 0;
		}
	} else {
		decimalPoint = value.indexOf(".");
		if (decimalPoint == -1) {
			amount = value.substring(valueStart);
			fraction = 0;
		} else if (decimalPoint == 3) {
			if (valueStart < decimalPoint) {
				amount = value.substring(valueStart, decimalPoint);
			} else {
				amount = 0;
			}
			fraction = value.substring(decimalPoint + 1);
		} else {
			amount = value.substring(valueStart, decimalPoint);
			fraction = value.substring(decimalPoint + 1);
		}
	}
//	alert ("amount" + amount);
//	alert ("fraction" + fraction);

	var isDE = false;
	var semCents = false;
    var promptsArray = new Array();
    if (amount > 0) {
        promptsArray = promptsArray.concat(cardinalPrompts(amount));
		if (amount.length > 5) {
			if (amount.substr((amount.length)-6, 6) == "000000") {
				isDE = true;
			}
		}	
		if (fraction == 0) {
			semCents = true;
		}
//		alert("semCentsCurr:" + semCents);
//		alert("amount:" + amount);
		promptsArray = promptsArray.concat(promptBaseUrl + "units/pausa.vox", currencyNamePrompts(currency, amount != 1, isDE, semCents));
//        if (fraction > 0) {
//            promptsArray.push(promptBaseUrl + "miscellaneous/and.vox");
//        }
		
    }

    if (fraction > 0) {
    /* added by mamata on 12/09/2003 for fixing ER 70913*/
    	if (fraction.length == 1)
        	fraction += '0';
      /*/ done adding*/
    	if (amount > 0) {
    		FalaCentavos = true;    		
    	}
        promptsArray = promptsArray.concat(cardinalPrompts(fraction));
		promptsArray = promptsArray.concat(promptBaseUrl + "units/pausa.vox", promptBaseUrl + "units/pausa.vox");					
		promptsArray = promptsArray.concat(subcurrencyNamePrompts(currency, fraction != 1));
    }

    if (amount == 0 && fraction == 0) {
        promptsArray = promptsArray.concat(cardinalPrompts(0));
        promptsArray = promptsArray.concat(currencyNamePrompts(currency, true, isDE, semCents));
    }

    return promptsArray;
}

function currencyNamePrompts(value, isPlural, isDE, semCents)
{
//	alert("semCentsCurr:" + semCents);
    value = value.toUpperCase();
    switch(value) {
        case "USD":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/dollars.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/dollar.vox");
            }
        case "GBP":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/poundssterling.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/poundsterling.vox");
            }
        case "EUR":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/euros.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/euro.vox");
            }
        case "JPY":
            return new Array(promptBaseUrl + "miscellaneous/yen.vox");
        case "DEM":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/marks.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/mark.vox");
            }
        case "ITL":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/lira.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/lire.vox");
            }
        case "FRF":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/francs.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/franc.vox");
            }
        
        case "REA":
            if (isPlural) {		
				if (isDE) { // > 1.000.000,99
					if (semCents) { // > 1.000.000,00
						return new Array(promptBaseUrl + "units/drealf.vox"); // DE REAIS.
					} else {				
						return new Array(promptBaseUrl + "units/drealc.vox"); // DE REAIS ...
					} 
				} else {				
					if (semCents) {	// 99,00			
						return new Array(promptBaseUrl + "units/reaisf.vox"); // REAIS.
					} else { // 99,99
						return new Array(promptBaseUrl + "units/reaisc.vox"); // REAIS ...
					}
				}
            } else { // 1,00
				if (semCents) {
					return new Array(promptBaseUrl + "units/realf.vox"); // REAL.
				} else { // 1,99
					return new Array(promptBaseUrl + "units/realc.vox"); //REAL ...
				}
            }

		/*		
        case "CAD":
            if (isPlural) {
                return new Array("Canadian dollars"); //FIXME
            } else {
                return new Array("Canadian dollar"); //FIXME
            }
        case "MXN":
            if (isPlural) {
                return new Array("pesos"); //FIXME
            } else {
                return new Array("peso"); //FIXME
            }
        case "CHF":
            if (isPlural) {
                return new Array("Swiss francs"); //FIXME
            } else {
                return new Array("Swiss franc"); //FIXME
            }
        */
        default:
            return void 0;
    }
}

function subcurrencyNamePrompts(value, isPlural)
{
    value = value.toUpperCase();
    switch(value) {
        case "USD":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/cents.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/cent.vox");
            }
        case "GBP":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/pence.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/penny.vox");
            }
        case "EUR":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/cents.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/cent.vox");
            }
        case "JPY":
            return void 0;
        case "DEM":
            if (isPlural) {
                return new Array(promptBaseUrl + "miscellaneous/pfennige.vox");
            } else {
                return new Array(promptBaseUrl + "miscellaneous/pfennig.vox");
            }
        case "ITL":
            return void 0;
        case "FRF":
            if (isPlural) {
                return new Array(propmtBaseUrl + "miscellaneous/centimes.vox");
            } else {
                return new Array(promptBaseUrl + "centime.vox");
            }
        case "REA":
            if (isPlural) {		
				return new Array(promptBaseUrl + "units/centsf.vox"); // CENTAVOS.
			} else { 
				return new Array(promptBaseUrl + "units/centf.vox"); // CENTAVO.
			}

		/*
        case "CAD":
            if (isPlural) {
                return new Array("cents"); //FIXME
            } else {
                return new Array("cent"); //FIXME
            }
        case "MXN":
            if (isPlural) {
                return new Array("centavos"); //FIXME
            } else {
                return new Array("centavo"); //FIXME
            }
        case "CHF":
            if (isPlural) {
                return new Array("centimes"); //FIXME
            } else {
                return new Array("centime"); //FIXME
            }
        */
        default:
            return void 0;
    }
}

// FIXME - 800 as eight hundred
// FIXME - 408 as four oh eight
function phonePrompts(value)
{
   var phoneNumber;
    var extension;
    var xIndex;

    xIndex = value.indexOf("x");

    if (xIndex != -1) {
        phoneNumber = value.substring(0, xIndex);
        extension = value.substring(xIndex + 1);
    } else {
        phoneNumber = value;
        extension = "";
    }
    
    var promptsArray = new Array();
    if (phoneNumber.length == 10) {
        promptsArray = promptsArray.concat(
            phoneThreeDigitGroupPrompts(phoneNumber.substring(0, 3)),
            promptBaseUrl + "miscellaneous/350ms.vox",
            phoneThreeDigitGroupPrompts(phoneNumber.substring(3, 6)),
            promptBaseUrl + "miscellaneous/350ms.vox",
            phoneThreeDigitGroupPrompts(phoneNumber.substring(6)));
    } else if (phoneNumber.length == 7) {
        promptsArray = promptsArray.concat(
            phoneThreeDigitGroupPrompts(phoneNumber.substring(0, 3)),
            promptBaseUrl + "miscellaneous/350ms.vox",
            
            alphanumericPrompts(phoneNumber.substring(3)));
    } else {
        promptsArray = alphanumericPrompts(phoneNumber);
    }

    if (extension.length > 0) {
        promptsArray.push(promptBaseUrl + "miscellaneous/extension.vox");
        promptsArray = promptsArray.concat(alphanumericPrompts(extension));
    }

    return promptsArray;  
}

function phoneThreeDigitGroupPrompts(value)
{
    if (value.charAt(1) == "0" && value.charAt(2) == "0") {
        return cardinalPrompts(value);
    } else {
        return alphanumericPrompts(value);
    }
}

function timePrompts(value)
{
    var hours;
    var minutes;
    var seconds;
    
	if (value.length == 2) {
		value = value.concat("00");
	}

    if (value.match(/^[0-9]+$/)) {
        if (value.length == 4) {
            hours = value.substr(0, 2);
            minutes = value.substr(2, 2);
        } else {
            return void 0;
        }
    } else {
        return void 0;
    }

    var promptsArray = new Array();

    //promptsArray = promptsArray.concat(cardinalPrompts(hours));
	promptsArray.push(promptBaseUrl + "units/pausa.vox");
	var intHours = Math.abs(hours);
	if (intHours != 1 && intHours != 21 && intHours != 2 && intHours != 22) {
		promptsArray.push(promptBaseUrl + "seme_men/f" + intHours + ".vox");
	} else {
		promptsArray.push(promptBaseUrl + "seme_men/" + intHours + "ac.vox");	
	}
    if (minutes == "00") {
		if (hours == "01") {
			promptsArray.push(promptBaseUrl + "data/hora.vox");
		} else {
			promptsArray.push(promptBaseUrl + "data/horas.vox");
		}
	} else {
		if (hours == "01") {
			promptsArray.push(promptBaseUrl + "data/hora_.vox");
		} else {
			promptsArray.push(promptBaseUrl + "data/horas_.vox");
		}
		promptsArray.push(promptBaseUrl + "data/_e_.vox");
	    promptsArray = promptsArray.concat(cardinalPrompts(minutes));
		if (minutes == "01") {
			promptsArray.push(promptBaseUrl + "data/minuto.vox");
		} else {
			promptsArray.push(promptBaseUrl + "data/minutos.vox");
		}

	}
    return promptsArray;

}

function yearPrompts(year, temMes)
{
//    var century = year.substring(0,2);
//    var rest = year.substring(2,4);

    var promptsArray = new Array();
	if (temMes)
	{
		promptsArray = promptsArray.concat(promptBaseUrl + "data/_de_.vox");
	}
	promptsArray = promptsArray.concat(cardinalPrompts(year));

/*    if (century == "20") {
        promptsArray = promptsArray.concat(cardinalPrompts(2000));
    } else {
        promptsArray = promptsArray.concat(cardinalPrompts(century));
    }

    if (century != "20") {
        if (rest == "00") {
            promptsArray.push(promptBaseUrl + "cardinals/hundred.vox");
        } else if (rest > 0 && rest < 10) {
            promptsArray = promptsArray.concat(alphanumericPrompts("O"));
            promptsArray =
                promptsArray.concat(cardinalPrompts(rest.substring(1,2)));
        } else {
            promptsArray = promptsArray.concat(cardinalPrompts(rest));
        }
    } else {
        if (rest != "00") {
            promptsArray = promptsArray.concat(cardinalPrompts(rest))
        }
    }
*/
    return promptsArray;

}

function monthPrompts(month, temDia, temAno)
{
//	alert (month + temDia + temAno);
    switch (month) {
        case "01":
			if (temDia && temAno) {
		        return new Array(promptBaseUrl + "data/de_jan_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_jan.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_jan.vox");
			}
        case "02":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_fev_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_fev.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_fev.vox");
			}
        case "03":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_mar_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_mar.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_mar.vox");
			}
        case "04":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_abr_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_abr.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_abr.vox");
			}
        case "05":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_mai_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_mai.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_mai.vox");
			}
        case "06":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_jun_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_jun.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_jun.vox");
			}
        case "07":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_jul_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_jul.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_jul.vox");
			}
        case "08":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_ago_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_ago.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_ago.vox");
			}
        case "09":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_set_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_set.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_set.vox");
			}
        case "10":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_out_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_out.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_out.vox");
			}
        case "11":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_nov_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_nov.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_nov.vox");
			}
        case "12":
			if (temDia && temAno){
		        return new Array(promptBaseUrl + "data/de_dez_.vox");
			} else if (temDia && !temAno) {
		        return new Array(promptBaseUrl + "data/de_dez.vox");
			} else { // !temDia e temAno
		        return new Array(promptBaseUrl + "data/_dez.vox");
			}

        default:
            return void 0;
    }
}

function dayOfWeekPrompts(dayOfWeek)
{
    if (dayOfWeek >= 0 && dayOfWeek <= 6) {
        return new Array(promptBaseUrl + "days/" + dayOfWeek + ".vox");
    } else {
        return void 0;
    }
}

function cardinalPrompts(number)
{
    if (number === undefined || !isFinite(number)) {
        return void 0;
    }

    if (number > 999999999999999) {
        return void 0;
    }

    var isNegative;

    if (number < 0) {
        isNegative = true;
        number = Math.abs(number);
    }
    
    if (number == 0) {
        return new Array(promptBaseUrl + "seme_men/f0.vox");
    }

    var str = new String(number);
    var arr = str.split(".");
	var eCento = false;

    number  = new Number(arr[0]);
    if (arr[1] != undefined)
    {
    	var fractionalPart = new Number(arr[1]);
    }
    
    /*var fractionalPart = number - Math.floor(number);
    number = number - fractionalPart;*/

    var promptsArray = new Array();
    var magnitude = 0;

    while (number > 0) {
        var endDigits = number % 1000;
		if (endDigits != 0) {
			if (magnitude == 0 && number > 999) {
				// primeira vez q passa e o numero eh maior que 999
				eCento = true;
			} else {
				eCento = false;
			}			
//			alert("endDigits" + endDigits + " " + number + " " + eCento);
			if (magnitudePrompts(magnitude, endDigits)!='')	{
	            promptsArray = threeDigitsPrompts(endDigits, number, eCento).concat(promptBaseUrl + "units/pausa.vox", promptBaseUrl + "units/pausa.vox", magnitudePrompts(magnitude, endDigits), promptsArray);
			} else {
				promptsArray = threeDigitsPrompts(endDigits, number, eCento).concat(magnitudePrompts(magnitude, endDigits), promptsArray);			
			}
        }
        number = number - endDigits;
        number = number / 1000;
        magnitude++;
    }
    if (isNegative) {
        promptsArray.unshift(promptBaseUrl + "miscellaneous/minus.vox");
    }

    if ( (fractionalPart != undefined) && (fractionalPart != 0) ) {
        fractionalPart = fractionalPart.toString();//.substring(2);
        promptsArray.push(promptBaseUrl + "miscellaneous/point.vox"); 
        promptsArray = promptsArray.concat(alphanumericPrompts(fractionalPart));
    }
    return promptsArray;
} 

function threeDigitsPrompts(number, totNumber, eCento)
{
    // assert number >=0 && number <= 999
    if (number < 0 || number > 999) {
        return void 0;
    }

    var hundreds = Math.floor(number / 100);
    var tensAndOnes = number % 100;

    var promptsArray = new Array();
//	alert("centenas:" + centenas);
    if (hundreds > 0) {
	    promptsArray.push(promptBaseUrl + "units/pausa.vox");
//		alert("hundreds:" + hundreds);
		if (hundreds == 1) {
//			alert(number);
			if (number > 100) {			
				promptsArray.push(promptBaseUrl + "centenas/cento.vox");
			}
			else {
				if (eCento) {
					promptsArray.push(promptBaseUrl + "centenas/e100.vox");
				} else {
					promptsArray.push(promptBaseUrl + "centenas/f100.vox");
				}
			}		
		}
		else {
			if (eCento) {
		        promptsArray.push(promptBaseUrl + "centenas/e" + hundreds + "00.vox");
			} else {
		        promptsArray.push(promptBaseUrl + "centenas/f" + hundreds + "00.vox");
			}
		}		
    }

    if (tensAndOnes > 0) {
//		alert("hundreds:::" + hundreds);
//		alert("totNumber:" + totNumber);
		if (hundreds < 1 && !FalaCentavos && totNumber < 999) {
			FalaCentavos = false;
//			alert("tensAndOnes:::" + tensAndOnes);
		    promptsArray.push(promptBaseUrl + "units/pausa.vox");
	        if (tensAndOnes < 50) {
		        promptsArray.push(promptBaseUrl + "seme_men/f" + tensAndOnes + ".vox");
			} else {
				promptsArray.push(promptBaseUrl + "seme/f" + tensAndOnes + ".vox");
	        }
		} else {
			promptsArray.push(promptBaseUrl + "units/pausa.vox");
	        if (tensAndOnes < 50) {
		        promptsArray.push(promptBaseUrl + "come_men/e" + tensAndOnes + ".vox");
			} else {
				promptsArray.push(promptBaseUrl + "come/e" + tensAndOnes + ".vox");
	        }
		}	
//		promptsArray.push(promptBaseUrl + "units/pausa.vox");
    }
    return promptsArray;
}

function ordinalThreeDigitsPrompts(number, totNumber, eCento)
{
    // assert number >=0 && number <= 999
    if (number < 0 || number > 999) {
        return void 0;
    }

    var hundreds = Math.floor(number / 100);
    var tensAndOnes = number % 100;

    var promptsArray = new Array();
    if (hundreds > 0) {
		promptsArray.push(promptBaseUrl + "units/pausa.vox");
		if (hundreds == 1) {
			if (number > 100) {			
				promptsArray.push(promptBaseUrl + "centenas/cento.vox");
			}
			else {
				if (eCento) {
					promptsArray.push(promptBaseUrl + "centenas/e100.vox");
				} else {
					promptsArray.push(promptBaseUrl + "centenas/f100.vox");
				}
			}		
		}
		else {
			if (eCento) {
		        promptsArray.push(promptBaseUrl + "centenas/e" + hundreds + "00.vox");
			} else {
		        promptsArray.push(promptBaseUrl + "centenas/f" + hundreds + "00.vox");
			}
		}		
    }

		
		
/*		if (numberTotal < 100) {
			if (hundreds == 1) {
				promptsArray.push(promptBaseUrl + "centenas/cento.vox");
			} else {
				promptsArray.push(promptBaseUrl + "centenas/f" + hundreds + "00.vox");
			}
		}
		else {
			promptsArray.push(promptBaseUrl + "centenas/e" + hundreds + "00.vox");			
		}

    }
*/

    if (tensAndOnes > 0) {
//		alert("numberORDINAL" + number);
		if (hundreds < 1 && totNumber < 999) {
			promptsArray.push(promptBaseUrl + "units/pausa.vox");
	        if (tensAndOnes < 50) {
		        promptsArray.push(promptBaseUrl + "seme_men/f" + tensAndOnes + ".vox");
			} else {
				promptsArray.push(promptBaseUrl + "seme/f" + tensAndOnes + ".vox");
	        }
		} else {
		    promptsArray.push(promptBaseUrl + "units/pausa.vox");
	        if (tensAndOnes < 50) {
		        promptsArray.push(promptBaseUrl + "come_men/e" + tensAndOnes + ".vox");
			} else {
				promptsArray.push(promptBaseUrl + "come/e" + tensAndOnes + ".vox");
	        }
		}
		promptsArray.push(promptBaseUrl + "units/pausa.vox");
    }
	// alert("number" + number);
    return promptsArray;
}

/**
 * Returns an array of vox file URLs corresponding to the
 * number 10^(3*number).
 *
 * Note the differences between the American and European systems:
 * <pre>
 *       Order of
 *       Magnitude      American    European
 *         10^0            -           -
 *         10^3         thousand    thousand
 *         10^6          million     million
 *         10^9          billion    thousand million or milliard
 *         10^12        trillion     billion
 * </pre>
 *
 * @param number The order of magnitude.
 * @return An array of URL strings.
 */
function magnitudePrompts(number, endDigits)
{
    switch (number) {
        case 0:
            return new Array();
        case 1:
            return new Array(promptBaseUrl + "units/mil.vox"); 
        case 2:
			if (endDigits == 1) {
				return new Array(promptBaseUrl + "units/milh.vox");	
			}
			else {				
				return new Array(promptBaseUrl + "units/milhs.vox");
			}
        case 3:
			if (endDigits == 1) {
				return new Array(promptBaseUrl + "units/bilh.vox");
			}
			else {
				return new Array(promptBaseUrl + "units/bilhs.vox");		
			}
        case 4:
			if (endDigits == 1) {
	            return new Array(promptBaseUrl + "units/trilh.vox");
			}
			else {
				return new Array(promptBaseUrl + "units/trilhs.vox");
			}
        default:
            return void 0;
    }
}

function ordinalMagnitudePrompts(number, endDigits)
{
	// alert("number:" + number)
    switch (number) {
        case 0:
            return new Array();
        case 1:
            return new Array(promptBaseUrl + "units/mil.vox"); 
		case 2:
			if (endDigits == 1) {
				return new Array(promptBaseUrl + "units/milh.vox");	
			}
			else {
				return new Array(promptBaseUrl + "units/milhs.vox");
			}
        case 3:
			if (endDigits == 1) {
				return new Array(promptBaseUrl + "units/bilh.vox");
			}
			else {
				return new Array(promptBaseUrl + "units/bilhs.vox");		
			}
        case 4:
			if (endDigits == 1) {
	            return new Array(promptBaseUrl + "units/trilh.vox");
			}
			else {
				return new Array(promptBaseUrl + "units/trilhs.vox");
			}
        default:
            return void 0;
    }
}

function ordinalPrompts(number)
{
    if (number === undefined || !isFinite(number) || number <= 0 ||
        ((number - Math.floor(number)) != 0) || number > 999999999999999 ) {
        return void 0;
    }
	
    var promptsArray = new Array();
    var magnitude = 0;
    var ordinal = true;
	var eCento = false;
	
    while (number > 0) {
        var endDigits = number % 1000;

        if (endDigits != 0) {
			if (magnitude == 0 && number > 999) {
				eCento = true;
			} else {
				eCento = false;
			}
            if (magnitude == 0 && ordinal) {
                promptsArray = ordinalThreeDigitsPrompts(endDigits, number, eCento).concat(promptsArray);
                ordinal = false;
            } else {
                if (ordinal) {
					promptsArray = threeDigitsPrompts(endDigits, number, eCento).concat(promptBaseUrl + "units/pausa.vox", promptBaseUrl + "units/pausa.vox",ordinalMagnitudePrompts(magnitude, endDigits), promptsArray);
                    ordinal = false;
                } else {
					promptsArray = threeDigitsPrompts(endDigits, number, eCento).concat(promptBaseUrl + "units/pausa.vox", promptBaseUrl + "units/pausa.vox", magnitudePrompts(magnitude, endDigits, number), promptsArray);
                }
            }
        }
        number = number - endDigits;
        number = number / 1000;
        magnitude++;
    }
    return promptsArray;
}


function digitoadigito(string)
{
    var i;
    var ch;
	var promptsArray = new Array();

    for (i = 0; i < string.length; i++) {
        ch = string.charAt(i);
		if (i >= string.length - 1) {
			promptsArray.push(promptBaseUrl + "numeros/f_" + ch + "_G729.wav");
		} else {
			promptsArray.push(promptBaseUrl + "numeros/m_" + ch + "_G729.wav");
		}
	}
    return promptsArray;
}

function alphanumericPrompts(string)
{
    var i;
    var ch;
    var promptsArray = new Array();
    string = string.toLowerCase();
    for (i = 0; i < string.length; i++) {
        ch = string.charAt(i);
        ch = ch.toLowerCase();
        if (ch.match(/\d/)) {
            promptsArray.push(promptBaseUrl + "cardinals/00" + ch + ".vox");
        } else if (ch.match(/[a-z]/)) {
            promptsArray.push(promptBaseUrl + "letters/" + ch + ".vox");
        } else if (ch.match(/\+/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/plus.vox");
        } else if (ch.match(/\</)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/lessthan.vox");
        } else if (ch.match(/\=/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/equals.vox");
        } else if (ch.match(/\%/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/percent.vox");
        } else if (ch.match(/\-/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/minus.vox");
        } else if (ch.match(/\>/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/greaterthan.vox");
        } else if (ch.match(/\&/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/and.vox");
        } else if (ch.match(/\./)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/dot.vox");
        } else if (ch.match(/\#/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/pound.vox");
        } else if (ch.match(/\*/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/star.vox");
        } else if (ch.match(/\@/)) {
            promptsArray.push(promptBaseUrl + "miscellaneous/at.vox");
        }
    }
    return promptsArray;
}

function dtmfPrompts(string)
{
    var i;
    var ch;
    var promptsArray = new Array();
    string = string.toLowerCase();

    for (i = 0; i < string.length; i++) {
        ch = string.charAt(i);
        if (ch.match(/[0-9abcd]/)) {
            promptsArray.push(promptBaseUrl + "dtmf/" + ch + ".vox");
        } else if (ch == "#") {
            promptsArray.push(promptBaseUrl + "dtmf/pound.vox");
        } else if (ch == "*") {
            promptsArray.push(promptBaseUrl + "dtmf/star.vox");
        }
    }
    return promptsArray;
}
