#!/bin/bash

# FauxGhost.sh - A script to install Gulp plugins required to develop FauxGhost Ghost theme and releasing the theme, documentation, demo builder, and source files.

## Function
function usage
{
    echo "$(tput setaf 2)Faux Ghost Theme Command Line Usage$(tput sgr 0)"
    echo "$(tput setaf 6)sh FauxGhost.sh -i$(tput sgr 0) or $(tput setaf 6)sh FauxGhost.sh --install$(tput sgr 0) - Installing all necessary Gulp plugins required to develop the FauxGhost theme"
    echo "$(tput setaf 6)sh FauxGhost.sh -r$(tput sgr 0) or $(tput setaf 6)sh FauxGhost.sh --release$(tput sgr 0) - Releasing FauxGhost theme, documentation, demobuilder, and source files"
    echo "$(tput setaf 6)sh FauxGhost.sh -h$(tput sgr 0) or $(tput setaf 6)sh FauxGhost.sh --help$(tput sgr 0) - FauxGhost theme command line usage help overview"
}

## Main
while [ "$1" != "" ]; do
    case $1 in
    	-i | --install	)	echo "$(tput setaf 3)Installing Necessary Gulp Plugins for FauxGhost$(tput sgr 0)"
              npm install --save
              bower install --save
							echo "$(tput setaf 2)Necessary Gulp Plugins for FauxGhost are Installed Successfully$(tput sgr 0)"
							exit
							;;
		-r | --release	)	echo "$(tput setaf 3)Releasing FauxGhost Theme Files$(tput sgr 0)"
							gulp release
              rm -r ~/ghost-0/content/themes/FauxGhost
              mkdir ~/ghost-0/content/themes/FauxGhost
              cp -R packages/FauxGhost ~/ghost-0/content/themes
							echo "$(tput setaf 2)FauxGhost Theme Files Released Successfully$(tput sgr 0)"
							exit
							;;
		-h | --help		)	usage
							exit
							;;
		*				)	echo "$(tput setaf 1)Please pass the available parameters$(tput sgr 0)\n"
							usage
							exit
	esac
done

if ["$1" == ""]; then
	echo "$(tput setaf 1)Please pass the available parameters$(tput sgr 0)\n"
	usage
fi
