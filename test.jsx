String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

main();
function main(){
	var myDoc = app.activeDocument;
	var pagesLength = myDoc.pages.length;

	//alert(myDoc.textFrames.item(99).parentPage.name);
	
	var tfSayisi = myDoc.textFrames.count();

	
	var dipnotlar = "";
	var hasiye = "";
	var metin = "";
	var sozluk = "";
	var p = 53;
	var data = "Sayfa "+p+"\n\n";
	var sayfaTfCount = app.activeDocument.pages[p].textFrames.count();
	var kacinciTf = 0;
	for(var i=0; i<sayfaTfCount;i++)
	{
		var dipnotSayisi = app.activeDocument.pages[p].textFrames[i].footnotes.count();
		if(dipnotSayisi>0)
		{
			for(var j = 0; j< dipnotSayisi;j++)
			{
				dipnotlar += app.activeDocument.pages[p].textFrames[i].footnotes.item(j).contents.replace("",j+1)+"\n";
			}
		}

		var tfIcerik = app.activeDocument.pages[p].textFrames[i].contents;
		if(tfIcerik.indexOf("HÂŞİYE")==0)
			hasiye = tfIcerik+"\n\n\n";
		else
		{
			kacinciTf++;
			if(kacinciTf==1)
			{
				metin = tfIcerik+"\n\n\n";

				var dIndex = 1;
				while(metin.indexOf("")!=-1)
				{
					metin = metin.replaceAt(metin.indexOf(""),"["+dIndex+"]");
					dIndex++;
				}
				
			}
			else if(kacinciTf==2)
				sozluk = "\n\n\n"+tfIcerik;
		}
	}

	data = data + metin + hasiye + dipnotlar + sozluk;
	//alert(app.activeDocument.pages[54].textFrames.count());
	// for(var i = 0; i<tfSayisi-1; i++)
	// {
	// 	if(myDoc.textFrames.item(i).parentPage.name==55)
	// 	{
	// 		//alert(myDoc.textFrames.item(i).contents);
	// 		//alert(myDoc.textFrames.item(i).contents);
			
	// 	}
	// }

	//Define path and file name
	var path = 'c:/apps/';
	var filename = (p+1)+'.txt';

//Create File object
	var file = new File(path + filename);

	file.encoding = 'UTF-8';
	file.open('w');
	file.write(data);
	file.close();
}