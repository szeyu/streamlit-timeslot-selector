from setuptools import setup, find_packages

setup(
    name="streamlit-timeslot-selector",
    version="0.0.1",
    author="Sze Yu Sim",
    author_email="szeyu.sim@embeddedllm.com",
    description="Streamlit component that allows you to select timeslot",
    packages=find_packages(),
    include_package_data=True,
    package_data={
        'timetable_selector': [
            'frontend/build/*',
        ],
    },
    install_requires=[
        'streamlit>=0.63',
    ],
)
