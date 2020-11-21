#!/usr/bin/python

# python -V
# 2.7.17

# Packages
# pip install BeautifulSoup4
# pip install lxml
# pip install requests

'''
Am ales o pagina din catalogul de laptopuri ai celor de la cel.ro
pentru ca imaginile salvate au dimensiunea mica (aprox 20KB)
Contentul pentru proiect va fi generat folosind aceste imagini, stocate local,
pentru a nu face requesturi in momentul incarcarii paginii
(atributul src="whatever" de pe imagini va fi catre un fisier local)
Parsam pagina pentru a obtine denumire, descriere, poza si pret
'''

from bs4 import BeautifulSoup
import requests
import urllib
import json
import time

url = 'https://www.cel.ro/laptop-laptopuri/'

response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')

content_divs = soup.find_all('div', {'class': 'productListingWrapper'})
list_el = []
j = 1

for element in content_divs:
    descriere_produs = element.find('h2', {'class': 'productTitle'}).span.text
    procesoare = ['Intel', 'AMD']
    for i in range(len(procesoare)):
        if (descriere_produs.find(procesoare[i]) != -1):
            idx = descriere_produs.find(procesoare[i])
            break
    title = descriere_produs[:idx]
    detalii = descriere_produs[idx:]
    pret = element.find('div', {'class': 'pretWrapper'}).b.text
    img_link = element.img['data-src']
    img_path = './pics/' + 'poza' + '{:03d}'.format(j) + '.jpg'
    urllib.urlretrieve(img_link, img_path)
    time.sleep(3)
    dict_el = {
            'title': title,
            'detalii': detalii,
            'pret': pret,
            'src': img_path
            }
    list_el.append(dict_el)
    j += 1

f = open('continut.json', 'w')
f.write(json.dumps(list_el))
f.close()







