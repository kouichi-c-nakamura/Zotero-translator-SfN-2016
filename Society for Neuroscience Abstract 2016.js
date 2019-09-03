{
	"translatorID": "1ed36c21-de68-4ba4-a27f-d724ce258db4",
	"label": "Society for Neuroscience Abstract 2016",
	"creator": "Kouchi C. Nakamura, PhD; kouichi.c.nakamura@gmail.com",
	"target": "^https?://(www\.)?abstractsonline\.com/pp8/(index\.html)?#!/(4036|4376|4649|7883)/presentation/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2019-09-02 18:38:58"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2017 Kouichi C. Nakamura, PhD

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


/*
This Zotero translator works with Socieity for Neuroscience Abstract from 2016 onwards

**Caveats**
Does not support "mulitiple" yet
Does not support taking a snapshot for "attachments"
The dynamically generated HTML of abstractsonline.com does not allow above operations

supported years: four digits after /pp8/ in the url specifies a year

7883 ... 2019
4649 ... 2018
4376 ... 2017
4071 ... 2016

Ideally "target" should be as below to support "multiple" entries
^https?://www\.abstractsonline\.com/pp8/#!/\d+/(presentation|presentations|sessions|participants)/

If you find a failure or error, please let me know:
Dr Kouichi C. Nakamura
kouichi.c.nakamura@gmail.com
*/


function detectWeb(doc, url) {

	if (url.indexOf('/presentation/') > -1) {
		return 'conferencePaper';
	} //else if (url.search(/(presentations|session|participant)\/[^\\]+\/\d+/) != -1) {
	//	return 'multiple'; // does not work
	//}
}

function doWeb(doc, url) {

	if (detectWeb(doc,url) == 'conferencePaper') {

		scrape(doc,url);

	}
	//TODO does not work properly becuase the page HTML is dynamically generated and
	// ZU.processDocuments() cannot obtain the actual page content from URL.
}




function scrape(doc,url){

	// NOTE doGet() html does not contain the actual contents,
	// object is HTTPreqest object, use processDocuments
	//
	// Zotero.debug(doc); //object HTMLDocument
	// Zotero.debug(doc.URL);

	var item = new Zotero.Item("conferencePaper");

	// pages, title
	var h2color_primary = ZU.xpath(doc,'//h2[@class="color-primary"]');

	//TODO when multiple doc does not contain the contents

	//Zotero.debug(h2color_primary);
	//TODO does not work for mulitiple

	var m1 = h2color_primary[0].innerHTML.match(/^[.\n\s\d\w\/\-]+(?=\s-\s)/);
	if (m1) {
		item.pages = m1[0].replace(/\s|\n/g,"");
	}

	//Zotero.debug(item.pages);

	var ogtitle = ZU.xpath(doc,'//meta[@property="og:title"]');
	item.title = ZU.xpath(ogtitle,'@content')[0].value;

	//Zotero.debug(item.pages);
	//Zotero.debug(item.title);


	// extra
	var well =ZU.xpath(doc,'//div[@class="well well-small"]');
	//Zotero.debug(well[0].innerHTML);

	var mst = well[0].innerHTML.match(/<dt>Session Type<\/dt>[.\n\s]*<dd>(.+)<\/dd>/);

	if (mst == null) {
		mst = "";
	}

	//Zotero.debug(mst);
	var session = ZU.xpath(doc,'//h1[@class="session"]/a');

	Zotero.debug(session);
	item.extra = "Session: " + session[0].innerText
		+ "; " + "Session Type: " + mst[1];


	//attachments
	//TODO does not work
	item.attachments.push({
		title: "Snapshot",
		document: doc
	});


	// creators

	// var disclosure = ZU.xpath(doc,'//div[@class="span7"]/dl/dd[2]'); // Use Disclosure data

	// var m = disclosure[0].innerHTML.match(/<b>[^<]+:<\/b>/g);
	// var names = [];
	// for (i = 0; i < m.length; i++) {
	// 	item.creators.push(ZU.cleanAuthor(m[i].match(/<b>([^<]+):<\/b>/)[1],"author"));
	// }

	var disclosures = ZU.xpath(doc, '//dl/dt[contains(., "Disclosures")]/following-sibling::dd');
	var authorsList = ZU.xpath(doc, '//dl/dt[contains(., "Authors")]/following-sibling::dd');
	if (disclosures) {
		var authors = ZU.xpath(disclosures[0], './b');
	} else if (authorsList) {
		var authors = authorsList.split(',');
	}
	if (authors) {
		for (var i=0; i<authors.length; i++) {
			item.creators.push(ZU.cleanAuthor((authors[i].textContent), "author"));
		}
	}

	Zotero.debug(item.creators);


	// date
	var spandate = ZU.xpath(doc,'//span[@class="session-date"]');

	item.date = spandate[0].innerHTML.match(/\w+\s\d+,\s\d+/)[0];

	if (ZU.xpath(doc,'//div[@class="span7"]/dl/dd[3]').length != 0) {
		item.abstractNote = ZU.xpath(doc,'//div[@class="span7"]/dl/dd[3]')[0].innerHTML;
	}

	item.publicationTitle = "Society for Neuroscience Abstract";
	item.url = doc.URL;
	item.conferenceName = "Society for Neuroscience";
	item.language = 'eng';

	item.complete();

}

// All the tests will fail because page contents cannot be loaded. They will issue "TypeError: m2 is n ull"

/** BEGIN TEST CASES **/
var testCases = []
/** END TEST CASES **/
