/**
* @desc Hier steht der consoleAppender für die Konsole und den Server inklusive eines Logs
*/

// Debugging: all loggers log to both the server and the console
var ajaxAppender=JL.createAjaxAppender('ajaxAppender');
var consoleAppender=JL.createConsoleAppender('consoleAppender');
JL("mylogger").setOptions({"appenders": [ajaxAppender,consoleAppender]});
JL("perry").setOptions({"appenders": [consoleAppender]});

//Beispiel Kommentar
JL("mylogger").info("Huhu, ich bin Perry und wenn du mich groß genug machst, sehe ich gut aus!");
JL("mylogger").info("Und damit es nicht doof aussieht, kommt Perry nicht in die Server Konsole!");
//Beispiel Perry
JL("perry").info("    ```~~--..,,,__\n _,,.-----------;;..;;,__,,,..---‘‘‘‘‘‘‘‘‘‘´´´´´´´´\\\n                   /                                \\\n                  /                              _,.-~°´´°~-.,_\n                 /                              /   _.,-*-.,_  \\\n                /   _,.-~°´´°~-.,_             /   /     ,-, \\  \\\n               /  /               \\            |   |    ´-´  |   |\n              /  /  _.,-*-.,_      \\           \\   \\         /   /\n             /   | /     ,-, \\     |         A  \\   `°-:_:-°`   /\n            /    \\ |    ´-´  |     /        / \\  `°~-:.,_,.:-~°`\n           /      \\\\         /    /        /   \\          \\\n          /        `°~-:.,_,.:-~°`        /     \\          \\     _.,;‘\\\n         (                               /       \\__  __,,,.!--~*      \\\n          \\                             /      ~``  ``                  )\n           \\                           /                               /\n            \\                         {        ______            _,.-~‘\n             \\                         \\             ‘-;,,,..--;~~‘'\n              \\                         \\                /    \\\n               \\                         ‘*--.,,__,,.--*‘     \\\n                \\                                              \\\n                 \\                                             \\ "
);
