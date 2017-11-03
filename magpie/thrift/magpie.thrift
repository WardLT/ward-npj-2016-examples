/**
 * Store data regarding an entry:
 * 
 *  name                : String describing this entry (parsed before 
 *  measuredProperties  : Measured class variable 
 *  predictedProperties : Predicted class variable for each model
 *  classProbs          : (Classifiers) Probability of membership in each class
 */
struct Entry {
    1: string name
    2: map<string,double> measuredProperties = {}
    3: map<string,double> predictedProperties = {}
    4: map<string,list<double>> classProbs = {}
}

/**
 * Holds all known information about a model
 * 
 * Known properties:
 *  author      : Name/contact info of author
 *  citation    : Citation information of the model
 *  classifier  : Whether this model is a classification (or regression) model
 *  dataType    : Type of data expected, defined by name of Magpie Dataset type
 *  description : Short description of this model
 *  modelType   : Simple description of model
 *  notes       : Any pertinent details about the model
 *  property    : Property being modeled
 *  training    : Description of training set
 *  trainTime   : When this model was trained (formatted string)
 *  units       : Units of prediction. (Classifiers) Name of classes, ";"-delimited
 *  valMethod   : Description of how this model was validated
 *  valScore    : Performance of model in cross-validation tests
 */
struct ModelInfo {
    1: string property
    2: string units
    3: string author
    4: string training
    5: string citation
    6: string notes
    7: string dataType
    8: string modelType
    9: bool classifier
   10: map<string,double> valScore
   11: string description
   12: string valMethod
   13: string trainTime
}

exception MagpieException {
    1: string why
}

service MagpieServer {

    /**
     * Get information about available models
     * @return Map of model name to model info 
     */
    map<string,ModelInfo> getModelInformation() throws (1: MagpieException ouch)

    /**
     * Compute the properties of each entry in a list. Results are stored in
     * the predictedProperties and classProbs maps.
     *
     * @param entries [in] List of entries to be evaluated
     * @param props [in] Names of properties to evaluate
     * @return Entry objects with property measurements
     */
    list<Entry> evaluateProperties(1:list<Entry> entries, 
            2:list<string> props) throws (1: MagpieException ouch)
	
    /**
     * Search for optimal materials based on a single objective in a 
     * user-defined space
     *
     *      _How to Define Objective Function_
     *
     * The first word in the objective function input should be the name of the 
     * property being optimized, followed by whether to minimize or maximize the
     * objective function, then the name of EntryRanker, and (finally) its options.
     * 
     * Summary: <property> <minimize|maximize> <EntryRanker method> <options...>
     *
     * Example: To find a material with a band gap close to 1.3 eV
     *     bandgap minimize TargetEntryRanker 1.3
     *
     * Relevant Document Pages:
     *
     * ./javadoc/magpie/optimization/rankers/package-summary.html
     *
     *      _How to Define Search Space_
     *
     * Search spaces are created using EntryGenerator classes. The first
     *  in the input string is the name of the generator class, which
     * is followed by any options for the generator
     *
     * Summary: <EntryGenerator method> <options...>
     *
     * Example: 5 points on each binary containing either Al, Ni, or Zr
     *     PhaseDiagramCompositionEntryGenerator 1 2 -alloy 0.2 Al Ni Zr
     *
     * Relevant Documentation Pages:
     *
     * ./javadoc/magpie/data/utilities/generators/package-summary.html
     *
     * @param obj [in] Objective function
     * @param genMethod [in] Definition of search space
     * @param numToList [in] Number of top candidates to return
     * @return List of the top-performing entries
     */
    list<Entry> searchSingleObjective(1:string obj, 2:string genMethod,
            3:i32 numToList) throws (1: MagpieException ouch)
	
    /**
     * Search for optimal materials based on a multiple objectives in a 
     * user-defined space. Combines multiple objective functions using
     * the AdaptiveScalarizingEntryRanker. 
     *
     * Individual objective functions are defined in the same way as in the
     * single objective search.
     *
     * Relevant Documentation Pages:
     *
     * ./javadoc/magpie/optimization/rankers/AdaptiveScalarizingEntryRanker.html
     *
     * @param p [in] Tradeoff Parameter
     * @param objs [in] Objective functions
     * @param genMethod [in] Definition of search space
     * @param numToList [in] Number of top candidates to return
     * @return List of the top-performing entries
     */
    list<Entry> searchMultiObjective(1:double p, 2:list<string> objs, 
        3:string genMethod, 4:i32 numToList) throws (1: MagpieException ouch)

}
