// const gptDiagramAssistantInstruction = `You are a software system designer. Your job is to come up with the related components that make up the system. Some examples of components include a ReactJS frontend component, a DynamoDB database component, an edge computing component, and a Cloudflare component. I want you to accept queries for desired systems and return the components that make up the system and their connections. Each component must have a parent or must have at least one child.

// Below is an example of a JSON you should return:

// {"components":[{"name":"ReactJS Frontend","children":["Node.js/Express Backend","Auth0"]},{"name":"Node.js/Express Backend","children":["PostgreSQL/MySQL","MongoDB/Redis","Auth0","Stripe/PayPal","Amazon S3","Elasticsearch","SendGrid/Mailgun","Docker/Kubernetes"]},{"name":"Auth0","children":["User Database"]},{"name":"PostgreSQL/MySQL","children":[]},{"name":"MongoDB/Redis","children":[]},{"name":"Stripe/PayPal","children":[]},{"name":"Amazon S3","children":[]},{"name":"Elasticsearch","children":[]},{"name":"SendGrid/Mailgun","children":[]},{"name":"Docker/Kubernetes","children":["AWS/Google Cloud"]},{"name":"AWS/Google Cloud","children":[]},{"name":"Cloudflare","children":["ReactJS Frontend"]},{"name":"Datadog/Sentry","children":["Node.js/Express Backend","ReactJS Frontend"]},{"name":"User Database","children":[]}]}

// I will provide you prompts and you should strictly return just the JSON format. ONLY RETURN THE JSON, NO TEXT BEFORE OR AFTER THE JSON PLEASE.`

const gptDiagramInst = `You are a software system designer. Your job is to come up with the related components that
make up the system. Some examples of components include a ReactJS frontend component, a
DynamoDB database component, an edge computing component, and a Cloudflare component.
I want you to accept queries for desired systems and return the components that make up the system
and their connections. Each component must have a parent or must have at least one child.
Your output must be in JSON format.`

const gptDiagramJSONFn = {
  name: 'design_system',
  description:
    'System design function that takes in an array of the components that make up the system.',
  parameters: {
    type: 'object',
    properties: {
      components: {
        type: 'array',
        description:
          "An array of the components that make up the system design. Each component has a children property, which is also an array of the names of the component's children. Each component must have at least one child or must be a parent",
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'The name of the component' },
            children: {
              type: 'array',
              description:
                'An array of the names of the children components that the parent component connects to',
              items: {
                type: 'string',
                description: 'The name of the child component'
              }
            }
          },
          required: ['name', 'children']
        }
      },
      type: {
        type: 'string',
        description:
          'Whether the components is a new creation of diagram, or updating the existing one.',
        enum: ['create', 'update']
      }
    },
    dependencies: {
      components: {
        allOf: [
          {
            $ref: '#/definitions/containsChild'
          }
        ]
      }
    },
    definitions: {
      containsChild: {
        properties: {
          name: {
            type: 'string'
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/definitions/containsChild'
            }
          }
        },
        allOf: [
          {
            contains: {
              properties: {
                name: {
                  type: 'string'
                }
              }
            }
          },
          {
            contains: {
              properties: {
                name: {
                  $ref: '#/definitions/containsChild'
                }
              }
            }
          }
        ]
      }
    },
    required: ['components', 'type']
  }
}

export { gptDiagramInst, gptDiagramJSONFn }
