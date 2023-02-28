// import  createSchema  from '@sanity/base/schema-creator';
// import  SchemaType  from 'all:part:@sanity/base/schema-type';

import product from './product';
import banner from './banner'

export const schemaTypes = [product,banner]

// export default createSchema({

//     name: 'default',
//     types: schemaTypes.concat([

//         product,banner

//     ])
// }

// )