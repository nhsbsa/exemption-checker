module.exports = function (env) { /* eslint-disable-line func-names,no-unused-vars */
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {};


  //
  // PROCESS NAME FUNCTION
  //
  filters.processName = function( ) {

    const firstName = ( this.ctx.data.firstName ) ? this.ctx.data.firstName.trim() : 'Sarah';
    const lastName = ( this.ctx.data.lastName ) ? this.ctx.data.lastName.trim() : 'Smith';

    return firstName + ' ' + lastName;

  };

  //
  // PROCESS DATE OF BIRTH FUNCTION
  //
  filters.processDateOfBirth = function(){

    const day = ( this.ctx.data.dateOfBirth && !Number.isNaN( parseInt( this.ctx.data.dateOfBirth.day ) ) ) ? parseInt( this.ctx.data.dateOfBirth.day ) : 28;
    const month = ( this.ctx.data.dateOfBirth && !Number.isNaN( parseInt( this.ctx.data.dateOfBirth.month ) ) ) ? parseInt( this.ctx.data.dateOfBirth.month ) : 10;
    const year = ( this.ctx.data.dateOfBirth && !Number.isNaN( parseInt( this.ctx.data.dateOfBirth.year ) ) ) ? parseInt( this.ctx.data.dateOfBirth.year ) : 1984;

    let today = new Date( year, month, day );

    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    

  };



  //
  // ALTER DATE BY NUMBER OF MONTHS FUNCTION
  //
  filters.alterTodaysDateByNumberOfMonths = function( monthOffset ){

    let today = new Date();
    var d = today.getDate();
    today.setMonth(today.getMonth() + monthOffset);
    if (today.getDate() !== d) {
      today.setDate(0);
    }

    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  };





  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
};
