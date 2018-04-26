var pkg = require('../package'),
    schema = require('../settings-schema'),
    properties = schema.properties,
    markdown = [],
    fs = require('fs');

function setDefault(setting) {
    let settingDefault = '**default:** ';

    if (setting.default === undefined && !setting.defaultObject) {
        settingDefault = settingDefault + 'none';
    } else if (setting.type === 'string') {
        settingDefault = settingDefault + '`"' + setting.default + '"`';
    } else if (['number', 'boolean'].indexOf(setting.type) > -1) {
        settingDefault = settingDefault + '`' + setting.default + '`';
    } else {
        settingDefault = settingDefault +
            '\n\`\`\`\n' +
            JSON.stringify(setting.defaultObject, null, 2) +
            `\n\`\`\``;
    }

    if (setting.type !== 'object')
        return settingDefault;
}

/*------------------------------------------------------------------------------------------------\
  Overview
\------------------------------------------------------------------------------------------------*/

    if (schema.overview)
        schema.overview
            .split('\n')
            .forEach(paragraph => {
                markdown.push(paragraph);
                markdown.push('');
            });

/*------------------------------------------------------------------------------------------------\
  Renderer-specific settings
\------------------------------------------------------------------------------------------------*/

    markdown.push(`# Renderer-specific settings`);
    markdown.push(`There are no Renderer-specific settings at this time.`);
/*------------------------------------------------------------------------------------------------\
  Webcharts settings
\------------------------------------------------------------------------------------------------*/

    var webchartsSettingsFlag = 0,
        webchartsSettings = fs.readFileSync('./src/defaultSettings.js', 'utf8')
            .split('\n')
            .filter(line => {
                if (line.indexOf('const webchartsSettings') > -1)
                    webchartsSettingsFlag = 1;

                if (webchartsSettingsFlag === 1 && /};/.test(line))
                    webchartsSettingsFlag = 0;

                return webchartsSettingsFlag;
            });
        webchartsSettings.splice(0,1,'{\r');
        webchartsSettings.push('}');

    markdown.push(``);
    markdown.push(`# Webcharts settings`);
    markdown.push(`The object below contains each Webcharts setting as of version ${schema.version}.`);
    markdown.push(``);
    markdown.push('```');
    markdown.push(webchartsSettings.join(''));
    markdown.push('```');

/*------------------------------------------------------------------------------------------------\
  Configuration markdown
\------------------------------------------------------------------------------------------------*/

    fs.writeFile(
        './scripts/configuration.md',
        markdown.join('\n'),
        (err) => {
            if (err)
                console.log(err);
            console.log('The configuration markdown file was built!');
});
