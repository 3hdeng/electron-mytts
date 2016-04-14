#!/bin/bash
tag=0.12.12

if [[ $# == 1 ]] ; then
	tag=$1	
fi	

cf ic  run  --name mynjs -p 3000:3000 \
	-v $(pwd):/mytts2 \
	-d registry.ng.bluemix.net/ibmnode


