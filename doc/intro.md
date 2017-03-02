# Povzetek

Ključne besede: JavaScript, prevajalnik, transpiler, http, nodejs

Diplomsko delo predstavi razliko med sodobnimi prevajalniki v JavaScript kodo (source-to-source compiler ali transpiler). Predmet obravnave so "CoffeeScript", "TypeScript" in "BabelJS". Uvod predstavi posamezen jezik, namen za njegov nastanek, ključne prednosti, ki ga naredijo uporabnega in potencialne slabosti. Podana so tudi razvojna okolja in nekaj ugotovitev glede nameščanja in uporabe le-teh. V nadaljevanju je v vsakem izmed jezikov implementiran preprost strežnik, ki čimbolje izkorišča funkcionalnosti danega jezika. Vsak strežnik je nato stestiran s raznimi performančnimi testi, ki so predstavljeni v sklepu. Poleg rezultatov je podano tudi mnenje o uporabnosti jezika in nekaj ugotovitev.

# Abstract

Keywords: JavaScript, compiler, transpiler, http, nodejs

This thesis outlines key differences between modern JavaScript transpilers (source-to-source compilers). It includes "CoffeeScript", "TypeScript" and "BabelJS". First each of the mentioned languages is given a short introduction which covers the key differentiators from others, shortcomings and the reason for creation. Included are also potential development environments and a guide on setting up one. In each language an example server is implemented which tries to exploit language features as best as possible. Every server is performance and load tested and the results are presented in conclusion. Along the results an opinion of usage and key differentiators are given.

# Uvod

Od nastanka svetovnega spleta leta 1989 naprej se njegove zmogljivost in razsežnosti konstantno širijo. Hitro po njegovem nastanku se je najprej standardiziral jezik HTML (leta 1993), ki se uporablja za izdelavo spletni strani. Hitro po tem so se začele pojavljati potrebe za večjo dinamiko spletni strani in tako je nastala ideja za vmesni jezik - jezik, ki deluje med strežnikom in klijentom in omogoča predstavitev dinamičnih vsebin (slike, razširitve, ipd). Tako je nastal JavaScript (leta 1995). Če nadaljujemo zgodovino, da pridemo še do tretjega mejnika na katerem stoji moderni splet moramo omeniti še izgled spletnih strani. Ker so bile začetne strani precej puste in ker se je pojavila potreba po lepšem dizajnu in preprostejšem načinu za stiliranje spletnih strani se je jeziku HTML pridružil še CSS (leta 1996).

Na omenjenih treh tehnologijah stoji svetovni splet še danes. Vsaka izmed omenjenih je šla skozi številne revizije in omogoča veliko več kot včasih. Svetovni splet se je razširil bolj kot je bilo sprva pričakovano in kot posledica tega se je dvignila tudi potreba po večih funkcionalnostih in stvareh, ki jih še takratne tehnologije niso omogočale. Tako so vse izmed tehnologij šle skozi nekaj revizij, da omogočajo vse kar lahko vidimo danes na spletu. 
