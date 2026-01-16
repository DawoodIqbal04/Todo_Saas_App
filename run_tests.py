import sys
import os
import pytest

# Add the project root to sys.path
sys.path.insert(0, os.path.abspath('.'))

# Run pytest
pytest.main(["backend/tests/test_security.py"])