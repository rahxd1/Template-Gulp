#!/usr/bin/env ruby
require 'json'
require 'csv'

offerings = {
	"certificate":{
		"name": "Certificate",
		"copy": "Consta de 1 año de estudio aplicado para emplearse en ocupaciones específicas.",
		"cities": {}
	},
	"diploma":{
		"name": "Diploma",
		"copy": "Consta de 2 años de estudio aplicado para emplearse en áreas particulares.",
		"cities": {}
	},
	"applied":{
		"name": "Applied Degree",
		"copy": "Consta de 3 años de estudio aplicado con práctica laboral en la industria.",
		"cities": {}
	},
	"baccalaureate":{
		"name": "Baccalaureate Degree",
		"copy": "Consta de 4 años con enfoque académico dirigido al aprendizaje teórico.",
		"cities": {}
	},
	"master":{
		"name": "Master's Degree",
		"copy": "Consta de 2 años de estudios después de 4 años de estudios superiores previos.",
		"cities": {}
	},
	"doctoral":{
		"name": "Doctoral Degree",
		"copy": "Consta de 2-3 años de estudios después de la maestría.",
		"cities": {}
	}
}

csv_universities = CSV.read('universities.csv', headers: true)
universities = csv_universities.map {|row| 
	row['name'].rstrip!
	row['web'].rstrip!
	row['logo'].rstrip!
	row.to_hash 
}

csv = CSV.read('offerings.csv', headers: true)
headers = csv.headers

csv.map do |row|

	# Ciudades del grado
	cities = offerings[row['Degree'].to_sym][:cities]
	
	unless cities[row['City'].strip]
		cities[row['City'].strip] = {}
	end
	
	# Especialidades de la ciudad
	specialties = cities[row['City'].strip]
		

	university = universities.find{|u|

		u['name'] == row['University'].strip
	}#{"name": row['University'], "web": "algo", "logo": "algo"}
	#p row['University'].strip

	(3..22).each { |n|
		unless row[n].nil?
			if specialties[headers[n]].nil?
				specialties[headers[n]] = []
			end
			specialties[headers[n]] << university
		end	
	}	
end

#puts JSON.pretty_generate(offerings)

File.open('src/json/academic-offerings.json', 'w') do |file|
  file.puts JSON.pretty_generate(offerings)
end