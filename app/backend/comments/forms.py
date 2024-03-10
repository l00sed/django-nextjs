from django import forms
from django.core import validators


class CommentForm(forms.Form):
    """Comment Form."""
    name = "comment-form"

    # Hidden Fields
    cid = forms.IntegerField(
        required=False,
        widget=forms.HiddenInput()
    )
    parent = forms.IntegerField(
        initial=0,
        required=False,
        widget=forms.HiddenInput()
    )
    article = forms.IntegerField(
        widget=forms.HiddenInput()
    )
    reply_level = forms.IntegerField(
        initial=0,
        max_value=9,
        widget=forms.HiddenInput()
    )

    # Visible Fields
    author = forms.CharField(
        label="",
        max_length=200,
        help_text="",
        widget=forms.TextInput(
            attrs={
                "placeholder": "Name"
            }
        )
    )
    content = forms.CharField(
        label="",
        max_length=2000,
        help_text="",
        widget=forms.Textarea(
            attrs={
                "placeholder": "Message or reply",
                "rows": 5
            }
        )
    )
    subscribe = forms.BooleanField(
        label="Email notifications?",
        initial=False,
        required=False,
        widget=forms.CheckboxInput()
    )

    # Conditional on subscribe checkbox
    email = forms.EmailField(
        label="",
        help_text="",
        max_length=254,
        required=False,
        widget=forms.EmailInput(
            attrs={
                "placeholder": "Email"
            }
        ),
        validators=[validators.validate_email]
    )

    # Additional setup on initialization
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""  # Removes : as label suffix
        # print("Article slug exists in submitted form data")

    # Override form validation "clean" method
    def clean(self):
        data = self.cleaned_data
        print(data)

        if data.get('subscribe', True):
            if data.get('email', None):
                raise forms.ValidationError(
                    "An email address is required in order to receive "
                    "notifications when new comments are added to the "
                    "discussion."
                )
            else:
                # print(data)
                return data
        else:
            # print(data)
            return data
