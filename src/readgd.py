import xml.etree.ElementTree as ET 



''' read the xml source file '''

tree = ET.parse('../readtest.xml')
root = tree.getroot()

root = ET.fromstring(tree)
 
#print ('the string is ')


data = [1, 2, 3, 4]


def data_to_html_table(data):
    html = '<table><tbody>'
    for item in data:
        html += '<tr><td>' + str(item) + '</td></tr>'
    html += '</tbody></table>'
    return html

print (data_to_html_table(data))
