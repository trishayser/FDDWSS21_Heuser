'use strict';
module.exports = function(app) {
    const station = require('../controllers/stationController');
    const facility = require('../controllers/facilityController');
    const company = require('../controllers/companyController');

    app.route('/stations')
        .get(station.list_stations)
        .post(station.create_station);

    app.route('/stations/:station_id')
        .get(station.read_station)
        .put(station.update_station)
        .delete(station.delete_station);

    app.route('/facilities')
        .get(facility.list_facilites)
        .post(facility.create_facility);

    app.route('/facilities/:facility_id')
        .get(facility.read_facility)
        .put(facility.update_facility)
        .delete(facility.delete_facility);

    app.route('/companies')
        .get(company.list_companies)
        .post(company.create_company);

    app.route('/companies/:company_id')
        .get(company.read_company)
        .put(company.update_company)
        .delete(company.delete_company);
};