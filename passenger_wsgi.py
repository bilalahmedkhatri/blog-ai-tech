# import imp
# import os
# import sys


# sys.path.insert(0, os.path.dirname(__file__))

# wsgi = imp.load_source('wsgi', 'api_dashboard/wsgi.py')

from api_dashboard import wsgi
application = wsgi.application
