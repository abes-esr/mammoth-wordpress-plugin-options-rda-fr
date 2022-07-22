function MAMMOTH_OPTIONS(mammoth) {

    /*
    function setParagraphStyleNameFromFonts(fonts, styleName, skipStyleNameRegex) {
        return mammoth.transforms.paragraph(function(paragraph) {
            var runs = mammoth.transforms.getDescendantsOfType(paragraph, "run");
            var isMatch = runs.length > 0 && runs.every(function(run) {
                return run.font && fonts.indexOf(run.font.toLowerCase()) !== -1;
            });
            if (isMatch && !skipStyleNameRegex.test(paragraph.styleName)) {
                return {...paragraph, styleName: styleName};
            } else {
                return paragraph;
            }
        });
    }
    */


    return {
        // ici sont listé les sites des docx non standard à Word
        // pour les mapper sur des classes CSS
        styleMap: [
            "p[style-name='rdaExemple5'] => p.rdaExemple5:fresh",
            "p[style-name='rdaAlternative/exception/ajout'] => span.rdaAlternativeexceptionajout:fresh",
            "r[style-name='Note de bas de page Car'] => span.NotedebasdepageCar:fresh",
            "p[style-name='Normal (Web)'] => span.NormalWeb:fresh",
        ],

/*
        transformDocument: setParagraphStyleNameFromFonts(
            ["consolas", "courier", "courier new"],
            "Code Block",
            /^Code Block/i
        ),
*/
        // ce code permet de transformer les images en base64 pour éviter qu'elles apparaissent
        // en nombre dans la médiathèque de wordpress (cf petite image RDA très nombreuses dans les documents)
        // cette façon de faire n'est pas très optimisée d'une point de vue HTML car les pages générées sont alors 
        // volumineuses mais c'est actuellement le meilleur moyen trouvé pour éviter de polluer la médiathèque de wordpress
		convertImage: mammoth.images.imgElement(function(image) {
			return image.read("base64").then(function(imageBuffer) {
				return {
					src: "data:" + image.contentType + ";base64," + imageBuffer
				};
			});
		})
    };
}
