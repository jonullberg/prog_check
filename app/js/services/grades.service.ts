/**
 * The Grades Service
 * For use in the ProgCheck Testing application
 * A Service that provides an array of Grades, their name, shortname, and their domains
 * Created by Jonathan Ullberg on 12/15/2015
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('grades', grades);

  // module.exports = function grades(app) {
  //   app.factory('grades', grades)
  // }

  function grades() {
    return [
      {
        'name': 'Kindergarten',
        'shortName': 'K',
        'domains': [
          'Counting & Cardinality',
          'Operations & Algebraic Thinking',
          'Numbers & Operations in Base Ten',
          'Measurement & Data',
          'Geometry'
        ]
      },
      {
        'name': 'First Grade',
        'shortName': '1st',
        'domains': [
          'Operations & Algebraic Thinking',
          'Numbers & Operations in Base Ten',
          'Measurement & Data',
          'Geometry'
        ]
      },
      {
        'name': 'Second Grade',
        'shortName': '2nd',
        'domains': [
          'Operations & Algebraic Thinking',
          'Numbers & Operations in Base Ten',
          'Measurement & Data',
          'Geometry'
        ]
      },
      {
        'name': 'Third Grade',
        'shortName': '3rd',
        'domains': ['Operations & Algebraic Thinking', 'Numbers & Operations in Base Ten', 'Numbers & Operations--Fractions', 'Measurement & Data', 'Geometry']
      },
      {
        'name': 'Fourth Grade',
        'shortName': '4th',
        'domains': [
          'Operations & Algebraic Thinking',
          'Numbers & Operations in Base Ten',
          'Numbers & Operations--Fractions',
          'Measurement & Data',
          'Geometry'
        ]
      },
      {
        'name': 'Fifth Grade',
        'shortName': '5th',
        'domains': [
          'Operations & Algebraic Thinking',
          'Numbers & Operations in Base Ten',
          'Numbers & Operations--Fractions',
          'Measurement & Data',
          'Geometry'
        ]
      },
      {
        'name': 'Sixth Grade',
        'shortName': '6th',
        'domains': [
          'Ratios & Proportional Relationships',
          'The Number System',
          'Expressions & Equations',
          'Statistics & Probability',
          'Geometry'
        ]
      },
      {
        'name': 'Seventh Grade',
        'shortName': '7th',
        'domains': [
          'Ratios & Proportional Relationships',
          'The Number System',
          'Expressions & Equations',
          'Statistics & Probability',
          'Geometry'
        ]
      },
      {
        'name': 'Eighth Grade',
        'shortName': '8th',
        'domains': [
          'Functions',
          'The Number System',
          'Expressions & Equations',
          'Statistics & Probability',
          'Geometry'
        ]
      }
    ];
  }

}
