export var global = {
    url: 'http://localhost:8000/api/',

    htmlEntities: function(str: any) {
        return String(str).replace('&ntilde;', 'ñ')
                          .replace('&Ntilde;', 'Ñ')
                          .replace('&amp;', '&')
                          .replace('&Ntilde;', 'Ñ')
                          .replace('&ntilde;', 'ñ')
                          .replace('&Ntilde;', 'Ñ')
                          .replace('&Agrave;', 'À')
                          .replace('&Aacute;', 'Á')
                          .replace('&Acirc;','Â')
                          .replace('&Atilde;','Ã')
                          .replace('&Auml;','Ä')
                          .replace('&Aring;','Å')
                          .replace('&AElig;','Æ')
                          .replace('&Ccedil;','Ç')
                          .replace('&Egrave;','È')
                          .replace('&Eacute;','É')
                          .replace('&Ecirc;', 'Ê')
                          .replace('&Euml;','Ë')
                          .replace(   '&Igrave;', 'Ì')
                          .replace('&Iacute;', 'Í'    )
                          .replace('&Icirc;', 'Î' )
                          .replace(   '&Iuml;', 'Ï')
                          .replace(   '&ETH;', 'Ð')
                          .replace(   '&Ntilde;', 'Ñ')
                          .replace(   '&Ograve;', 'Ò')
                          .replace(   '&Oacute;', 'Ó')
                          .replace('&Ocirc;', 'Ô' )
                          .replace(   '&Otilde;', 'Õ')
                          .replace('&Ouml;', 'Ö'  )
                          .replace('&Oslash;', 'Ø'    )
                          .replace(   '&Ugrave;' ,'Ù')
                          .replace(   '&Uacute;', 'Ú')
                          .replace(   '&Ucirc;', 'Û')
                          .replace(   '&Uuml;', 'Ü')
                          .replace(   '&Yacute;', 'Ý')
                          .replace('&THORN;', 'Þ' )
                          .replace(   '&szlig;', 'ß')
                          .replace(   '&agrave;', 'à')
                          .replace(   '&aacute;', 'á')
                          .replace(   '&acirc;', 'â')
                          .replace(   '&atilde;', 'ã')
                          .replace('&auml;', 'ä'  )
                          .replace(   '&aring;', 'å')
                          .replace(   '&aelig;', 'æ')
                          .replace(   '&ccedil;', 'ç')
                          .replace('&egrave;', 'è'    )
                          .replace('&eacute;', 'é'    )
                          .replace('&ecirc;', 'ê' )
                          .replace('&euml;', 'ë'  )
                          .replace(   '&igrave;', 'ì')
                          .replace('&iacute;', 'í'    )
                          .replace('&icirc;', 'î' )
                          .replace('&iuml;', 'ï'  )
                          .replace('&eth;', 'ð'   )
                          .replace(   '&ntilde;', 'ñ')
                          .replace('&ograve;','ò')
                          .replace('&oacute;','ó')
                          .replace('&ocirc;','ô')
                          .replace('&otilde;','õ')
                          .replace('&ouml;','ö')
                          .replace('&oslash;','ø')
                          .replace('&ugrave;','ù')
                          .replace('&uacute;','ú')
                          .replace('&ucirc;','û')
                          .replace('&uuml;' , 'ü')
                          .replace('&yacute;', 'ý')
                          .replace('&thorn;', 'þ')
                          .replace('&yuml;', 'ÿ');
    },

    getFechaActual: function() {
        let date: any = new Date();
        date = date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear();

        let d: any       = new Date(date.split("/").reverse().join("-"));
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        let dd: any      = d.getDate();     if(dd < 10) dd='0'+dd;
        let mm: any      = d.getMonth()+1;  if(mm < 10) mm='0'+mm;
        let yy: any      = d.getFullYear();
        return yy+"-"+mm+"-"+dd;
    }
}