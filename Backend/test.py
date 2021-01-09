a = {"widgets":[{
            "type": "metric",
            "x": 9,
            "y": 0,
            "width": 9,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": False,
                "region": "eu-west-2",
                "metrics": [
                    [ "MediaLive", "NetworkOut", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "title": "WS-Dazzler-Africa-Metric-NetworkOut"
            }
        },{
            "type": "metric",
            "x": 9,
            "y": 30,
            "width": 9,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "MediaLive", "NetworkIn", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "view": "timeSeries",
                "stacked": False,
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "title": "WS-Dazzler-Africa-Metric-NetworkIn"
            }
        },{
            "type": "metric",
            "x": 9,
            "y": 6,
            "width": 9,
            "height": 6,
            "properties": {
                "metrics": [
                    [ "MediaLive", "FillMsec", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "view": "singleValue",
                "stacked": False,
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "title": "WS-Dazzler-Africa-Metric-FillMsec"
            }
        },{
            "type": "metric",
            "x": 0,
            "y": 12,
            "width": 9,
            "height": 6,
            "properties": {
                "view": "singleValue",
                "stacked": "False",
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "metrics": [
                    [ "MediaLive", "DroppedFrames", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "title": "WS-Dazzler-Africa-Metric-DroppedFrames"
            }
        },{
            "type": "metric",
            "x": 0,
            "y": 18,
            "width": 9,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": False,
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "metrics": [
                    [ "MediaLive", "SvqTime", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "title": "WS-Dazzler-Africa-Metric-SvqTime"
            }
        },{
            "type": "metric",
            "x": 0,
            "y": 24,
            "width": 9,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": False,
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "metrics": [
                    [ "MediaLive", "InputVideoFrameRate", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "title": "WS-Dazzler-Africa-Metric-InputVideoFrameRate"
            }
        },{
            "type": "metric",
            "x": 9,
            "y": 36,
            "width": 9,
            "height": 6,
            "properties": {
                "view": "timeSeries",
                "stacked": False,
                "region": "eu-west-2",
                "stat": "Average",
                "period": 300,
                "metrics": [
                    [ "MediaLive", "PrimaryActive", "ChannelId", "4966424", "Pipeline", "0" ]
                ],
                "title": "WS-Dazzler-Africa-Metric-PrimaryActive"
            }
        }
]}

if __name__ == "__main__":
    print(a['widgets'][0]['properties']['metrics'])