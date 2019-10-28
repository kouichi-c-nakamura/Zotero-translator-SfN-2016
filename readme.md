# Readme for Society for Neuroscience Abstract 2016.js 



`Society for Neuroscience Abstract 2016.js` is a web translator for the bibliographic software, [Zotero](https://www.zotero.org/). This will allow you to store SfN abstracts into your Zotero library as Conference Article type.

This translator works for Society for Neuroscience Abstracts from 2016 onwards.

[https://www.abstractsonline.com/pp8/#!/7883](https://www.abstractsonline.com/pp8/#!/7883) (year 2019)

[https://www.abstractsonline.com/pp8/#!/4649](https://www.abstractsonline.com/pp8/#!/4649) (year 2018)

[https://www.abstractsonline.com/pp8/#!/4376](https://www.abstractsonline.com/pp8/#!/4376) (year 2017)

[https://www.abstractsonline.com/pp8/#!/4071](https://www.abstractsonline.com/pp8/#!/4071) (year 2016)



Although I have made [a Pull Request](https://github.com/zotero/translators/pull/1427) for [Zotero translators](https://github.com/zotero/translators), it's stuck and has not been added to Zotero. I decided to create a separate repo on its own.


## Example

Using [CSL_JNS_DOI style](https://github.com/kouichi-c-nakamura/CSL_JNS_DOI), an abstract item imported in Zotero looks like

> Nakamura KC, Micklem B, Berry N, Spagnol G, Sharott A, Magill PJ (2019) CHemoarchitectonic Atlas of the Mouse thalamus as a BNDU opEn Resource (CHAMBER): A publicly-accessible online database of protein expression in mouse brain. In: Society for Neuroscience Abstract, pp 089.01/DP14/BB1. Chicago, IL., https://www.abstractsonline.com/pp8/index.html#!/7883/presentation/64250

Note that `pp` needs to be removed manually with this style (see below).

## Installation 

1. Find and open your Zotero data directory from Preferences > Advanced > Files and Folders > Data  Directory Location > Show Data  Directory.
2. Find the folder `translators`
3. Download `Society for Neuroscience Abstract 2016.js` and place it in the `translators` folder.
4. Restart your Zotero and web browser.

## Tips

- If the abstract page is not detected for the translator, try reloading the page a few times and usually it works. 

## Issues

- We can argue whether an abstract in SfN conference should be treated as "Journal Article" or "Conference Paper". The latter makes more sense, so I chouse it. Yet, when you want to cite those abstracts in your paper, Journal Article format might work better.
- As identifiers, the presentation ID eg. 089.01 and place ID eg. DP1/BB1 are both important, but where should we keep them? I chose Pages, but this results in `pp 089.01/DP1/BB1` in citation, so not ideal (you need to manually remove `pp`). 

## Developer

Dr Kouichi C. Nakamura

MRC Brain Network Dynamics Unit

kouichi.c.nakamura@gmail.com



