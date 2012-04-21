
""" PYTHON """
import os

filePath = os.path.join(os.getcwd(), "README.md")

if not (os.path.exists(filePath)):
    print "Could not read file %s" % filePath
else:
    print open(filePath, "r").readLines()