from application.model import Dataset
from application import app
from flask import Flask, render_template

@app.route('/')
def index():
    # Dataset(name="Hephaestus", description="Hephaestus is a volcano-disaster dataset for semantic segmentation of ground deformation.").save()
    # Dataset(name="Creating xBD", description="xBD is a general-disaster dataset for change detection and damage assessment of buildings.").save()
    datasets=Dataset.objects().all()
    return render_template("dataset.html", datasets=datasets)
