# Google Cloud Vision API

**NOTE:** This application uses ASP.NET, C#, MVC5, HTML5, CSS3, JS, AngularJS 1.X, Microsoft SQL Server, and WebAPI.

The purpose of this app is to utilize the **Google Cloud Vision API** to analyze an image input, which can be either a URL or an uploaded image file.

## API Notes

To keep the Google Cloud API key safe, I put it inside a SQL table and call a `GET` on page load.
* For added security, you can implement the Vision API call through a proxy API call through your own web API service.
* [Authenticating to Cloud Vision API](https://cloud.google.com/vision/docs/auth)

For this app, I currently have `WEB_DETECTION` and `LABEL ANNOTATIONS` limit to 10 for the API calls.
* Other features include: `CROP_HINTS`, `FACE_DETECTION`, `IMAGE_PROPERTIES`, `LANDMARK_DETECTION`, `LOGO_DETECTION`, `TEXT DETECTION`, and `SAFE_SEARCH_DETECTION`.
* [Making a Vision API request](https://cloud.google.com/vision/docs/request)

## How the app works

On the index page, it has two tabs for image input: Image URL or Image Upload.

The JSON request format for Image URL is set up as below.
```
{
  "requests":[
    {
      "image":{
        "source":{
          "imageUri":
            "INSERT IMAGE URL HERE"
        }
      },
      "features":[
        {
          "type":"LABEL_DETECTION",
          "maxResults":10
        },
        {
          "type":"WEB_DETECTION"
        }  
      ]
    }
  ]
}
```

The JSON request format for Image Upload is set up as below.
```
{
  "requests":[
    {
      "image":{
        "content":"BASE64-ENCODED IMAGE STRING HERE"
      },
      "features":[
        {
          "type":"LABEL_DETECTION",
          "maxResults":10
        },
        {
          "type":"WEB_DETECTION"
        }  
      ]
    }
  ]
}
```

* Note that the image input file needs to be converted to a BASE64 string before sending it as a request.
